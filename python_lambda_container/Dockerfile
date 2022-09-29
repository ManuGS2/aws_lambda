FROM public.ecr.aws/lambda/python:3.9
RUN yum install -y gcc-c++ postgresql-devel python-psycopg2 postgresql-libs

COPY requirements.txt ./
RUN python3.9 -m pip install --upgrade pip && python3.9 -m pip install -r requirements.txt -t .

COPY *.py ./

CMD ["app.lambda_handler"]
