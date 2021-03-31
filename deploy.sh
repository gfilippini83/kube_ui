#/bin/bash

npm run build:ssr

docker build -t us.gcr.io/singular-elixir-308623/ui:$1 . 
docker push us.gcr.io/singular-elixir-308623/ui:$1



kubectl delete -f yamls/ui-deployment.yaml

kubectl create -f yamls/ui-deployment.yaml