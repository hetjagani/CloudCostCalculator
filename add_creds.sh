#!/bin/bash

if [ $# -gt 2 ]
then
  echo "Usage: $0 <access token> <secret token>";
  exit;
fi

if [ $1 == "clear" ]
then
  sed -i "s/(\"[A-Za-z0-9]*\", \"[A-Za-z0-9$&+,:;=?@#|'<>.-^*()%!\/]*\")/(\"access\", \"secret\")/" ./src/app/services/AWS-utils.service.ts
  exit 0;
fi  

if [ $# -eq 2 ]
then
  access=$1;
  secret=$2;

  sed -i "s/(\"[A-Za-z0-9]*\", \"[A-Za-z0-9$&+,:;=?@#|'<>.-^*()%!\/]*\")/(\"${access}\", \"${secret}\")/" ./src/app/services/AWS-utils.service.ts
  exit;
fi