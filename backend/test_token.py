from jose import jwt

token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6InNqaGFzdG1AZ21haWwuY29tIiwiZXhwIjoxNzgzMTA0Njg2fQ.MLWi2zaSag4WmZnV_6CWCEEy083J3PhVJJAPrGKGEpo"

SECRET_KEY = "bhaia_secret_key"
ALGORITHM = "HS256"

payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

print(payload)