FROM tomcat:9.0.37-jdk14
ADD target/*.war /usr/local/tomcat/webapps/rest.war
EXPOSE 8080
CMD chmod +x /usr/local/tomcat/bin/catalina.sh
CMD ["catalina.sh", "run"]