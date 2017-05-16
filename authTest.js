curl --request GET \
  --url '{{url}}/oauth2/{{authorizationServerId}}/v1/authorize?client_id={{clientId}}&response_type=token&response_mode=fragment&scope={{customScopes}}&redirect_uri={{redirectUri}}&state={{state}}&nonce={{%24guid}}'


  curl GET https://dev-477147.oktapreview.com/oauth2/ausahaw5ezTByBxnQ0h7/v1/authorize?client_id=83xpWa4wpf7FhSOYDdgz&response_type=token&response_mode=query&scope=openid&state=statestring&nonce=ghghghgh787878


// Get with query response type 
curl GET https://dev-477147.oktapreview.com/oauth2/ausahaw5ezTByBxnQ0h7/v1/authorize?client_id=83xpWa4wpf7FhSOYDdgz&response_type=code&response_mode=query&scope=offline_access&redirect_uri=http://localhost:8000/authorization-code/callback&state=statestring&nonce=ghghghgh787878
