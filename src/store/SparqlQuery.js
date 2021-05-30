import axios from "axios";
import qs from "qs";

const BASE_URL = "http://localhost:3030/article/query";

export default class SparqlQuery {
  async getAll(text) {
    const headers = {
      Accept: "application/sparql-results+json,*/*;q=0.9",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    };

    const query = {
      query: `
      PREFIX dc:  <http://purl.org/dc/terms/>
      PREFIX sdo: <https://stuchalk.github.io/scidata/ontology/scidata.owl#>
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

      SELECT ?article ?id ?title ?author ?subject ?date
      where { 
        ?article dc:identifier	?id .
        ?article dc:title      	?title .
        FILTER regex(?title, "${text}")
      } 
    `,
    };

    try {
      const { data } = await axios(BASE_URL, {
        method: "POST",
        headers,
        data: qs.stringify(query),
      });

      const remappedData = data.results.bindings.map((items) => {
        return {
          id: items.id.value,
          title: items.title.value,
        };
      });

      return remappedData;
    } catch (err) {
      console.error(err);
    }
  }

  async getById(id) {
    const headers = {
      Accept: "application/sparql-results+json,*/*;q=0.9",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    };

    const articleQuery = {
      query: `
      PREFIX dc:  <http://purl.org/dc/terms/>
      PREFIX sdo: <https://stuchalk.github.io/scidata/ontology/scidata.owl#>
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

      SELECT ?article ?id ?title ?abstract ?date
      where { 
        ?article dc:identifier	                    ?id .
        ?article dc:title      	                    ?title .
        ?article dc:description	                    ?abstract .
        OPTIONAL { ?article dc:date ?date . }
        FILTER regex(?id, "${id}")
      } 
    `,
    };

    const authorQuery = {
      query: `
      PREFIX dc:  <http://purl.org/dc/terms/>
      PREFIX sdo: <https://stuchalk.github.io/scidata/ontology/scidata.owl#>
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

      SELECT ?article ?id ?author
      where { 
        ?article dc:identifier	                    ?id .
        ?article dc:creator/(rdf:rest*/rdf:first)*	?author .
        FILTER regex(?id, "${id}")
      } 
    `,
    };

    const subjectQuery = {
      query: `
      PREFIX dc:  <http://purl.org/dc/terms/>
      PREFIX sdo: <https://stuchalk.github.io/scidata/ontology/scidata.owl#>
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

      SELECT ?article ?id ?title ?abstract ?author ?subject ?date
      where { 
        ?article dc:identifier	                    ?id .
        ?article dc:subject/(rdf:rest*/rdf:first)*  ?subject .
        FILTER regex(?id, "${id}")
      } 
    `,
    };

    try {
      const getArticleData = async () => {
        const article = await axios(BASE_URL, {
          method: "POST",
          headers,
          data: qs.stringify(articleQuery),
        });
        const author = await axios(BASE_URL, {
          method: "POST",
          headers,
          data: qs.stringify(authorQuery),
        });
        const subject = await axios(BASE_URL, {
          method: "POST",
          headers,
          data: qs.stringify(subjectQuery),
        });

        return { article, author, subject };
      };

      const articleRawData = await getArticleData();

      var dataModel = {
        id: "",
        title: "",
        abstract: "",
        author: [],
        subject: [],
        date: "",
        suggestion: [],
      };

      articleRawData.article.data.results.bindings.map((items) => {
        dataModel.id = items.id.value;
        dataModel.title = items.title.value;
        dataModel.abstract = items.abstract.value;
        if (items.date) {
          dataModel.date = new Date(items.date.value).toLocaleDateString();
        }
      });

      articleRawData.author.data.results.bindings.map((items) => {
        dataModel.author.push(items.author.value);
      });

      articleRawData.subject.data.results.bindings.map((items) => {
        dataModel.subject.push(items.subject.value);
      });

      for (let index = 0; index < dataModel.subject.length; index++) {
        if (dataModel.subject[index] !== "Computer science") {
          dataModel.suggestion = dataModel.suggestion.concat(
            await this.getBySubject(dataModel.subject[index])
          );
        }
      }

      console.log(dataModel);

      return dataModel;
    } catch (err) {
      console.error(err);
    }
  }

  async getByAuthor(author) {
    const headers = {
      Accept: "application/sparql-results+json,*/*;q=0.9",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    };

    const query = {
      query: `
      PREFIX dc:  <http://purl.org/dc/terms/>
      PREFIX sdo: <https://stuchalk.github.io/scidata/ontology/scidata.owl#>
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

      SELECT ?article ?id ?title ?author ?date
      where { 
        ?article dc:identifier	?id .
        ?article dc:title      	?title .
        ?article dc:creator/(rdf:rest*/rdf:first)*  ?author .
        FILTER regex(?author, "${author}")
      } 
    `,
    };

    try {
      const { data } = await axios(BASE_URL, {
        method: "POST",
        headers,
        data: qs.stringify(query),
      });

      var dataModel = [];

      data.results.bindings.map((items, index) => {
        if (index != 0) {
          if (items.id.value != dataModel[index - 1].id) {
            return dataModel.push({
              id: items.id.value,
              title: items.title.value,
            });
          }
        }
        return dataModel.push({
          id: items.id.value,
          title: items.title.value,
        });
      });

      return dataModel;
    } catch (err) {
      console.error(err);
    }
  }

  async getBySubject(subject) {
    const headers = {
      Accept: "application/sparql-results+json,*/*;q=0.9",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    };

    const query = {
      query: `
      PREFIX dc:  <http://purl.org/dc/terms/>
      PREFIX sdo: <https://stuchalk.github.io/scidata/ontology/scidata.owl#>
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

      SELECT ?article ?id ?title ?author ?subject ?date
      where { 
        ?article dc:identifier	?id .
        ?article dc:title      	?title .
        ?article dc:subject/(rdf:rest*/rdf:first)*  ?subject .
        FILTER regex(?subject, "${subject}")
      } 
    `,
    };

    try {
      const { data } = await axios(BASE_URL, {
        method: "POST",
        headers,
        data: qs.stringify(query),
      });

      console.log(data);

      var dataModel = [];

      data.results.bindings.map((items, index) => {
        if (index > 0) {
          if (
            !data.results.bindings.find(
              (item) => item.id.value === items.id.value
            )
          ) {
            console.log("different");
            return dataModel.push({
              id: items.id.value,
              title: items.title.value,
            });
          }
        }
        return dataModel.push({
          id: items.id.value,
          title: items.title.value,
        });
      });

      return dataModel;
    } catch (err) {
      console.error(err);
    }
  }
}
