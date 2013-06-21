bundle exec thin start

http://code.macournoyer.com/thin/

curl is a command line utility for grabbing web pages

curl http://www.amazon.com

ports allow you to run multiple services on one machine.

//this returns a website
curl http://localhost:3000


//this returns JSON
curl http://localhost:3000/api/resumes

RESTful
http://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm

server/representation/representation metadata/resource metadata(identifier)/control data


curl http://localhost:3000/api/resumes/51c208396b1642a626000001 -X GET


note: we use POST to create a new record
