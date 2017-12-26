# Local Setup

1. gcloud auth application-default login
2. ./cloud_sql_proxy -instances=wisecamp-386512:asia-east1:starparty=tcp:3306
3. yarn install
4. yarn start to run local server

# Deploy to Cloud

1. gcloud app deploy
