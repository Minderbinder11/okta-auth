//base64Values.js

//${Base64(<client_id>:<client_secret>)}

var string = "83xpWa4wpf7FhSOYDdgz:-s6qFUbhXPNmRHC8QB6H3HHcn1tkD4KM1pt7HQZi";


  curl -v POST \
  "https://dev-477147.oktapreview.com/oauth2/ausahaw5ezTByBxnQ0h7/v1/token"\
  -H 'Accept: application/json'\
  -H 'Authorization: Basic ODN4cFdhNHdwZjdGaFNPWURkZ3o6LXM2cUZVYmhYUE5tUkhDOFFCNkgzSEhjbjF0a0Q0S00xcHQ3SFFaaQ=='\
  -d "grant_type=password&username=pbarow@gmail.com&password=BH22escow"


  curl --request POST \
  --url https://dev-477147.oktapreview.com//oauth2/{{authorizationServerId}}/v1/token \
  --header 'accept: application/json' \
  --header 'authorization: Basic' \
  --data 'grant_type=password&redirect_uri={{redirectUri}}&username={{username}}&password={{password}}&scope={{customScopes}}%20offline_access'