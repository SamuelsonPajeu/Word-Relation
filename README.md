
# Word Relation (FRONT)
A Project to demonstrate the use of an [API](https://github.com/SamuelsonPajeu/desafio_palavra)

[![Netlify Status](https://api.netlify.com/api/v1/badges/37b3f99f-2b5e-46c0-a344-5ef4bf82ce34/deploy-status)](https://app.netlify.com/sites/word-relation/deploys)

![image](https://github.com/SamuelsonPajeu/Word-Relation/assets/79151331/d801ba6a-ad04-4d39-ad45-a43bdcdc062a)


## Access
- Live Site URL: https://word-relation.netlify.app

## Install
- A plain .html file, just open `index.html` and you're ready to go.

## Usage
- ENDPOINT: https://desafio-palavra.onrender.com

<details>
  <summary><code>GET</code> <code><b>/get_data/{string}</b></code> <code>(Search by word)</code></summary>
 
##### Parameters

> | name              |  type     | data type      | description                         |
> |-------------------|-----------|----------------|-------------------------------------|
> | `string` |  required | string | Exactly match of a brasilian word |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`        | JSON       |


##### Example cURL

> ```javascript
>  curl -X GET "https://desafio-palavra.onrender.com/get_data/amor" -H "Content-Type: application/json" -H "accept: */*"
> ```

</details>


