FROM openjdk:14-jdk-alpine as build

RUN apk add maven

ARG JAR_PATH

VOLUME /tmp
WORKDIR /

COPY . .

RUN mvn clean install

WORKDIR /jaxrs

RUN mvn clean package

RUN mv ./target/jaxrs.blog-0.1.0.war /app.war

# package stage
FROM tomcat:9.0.37-jdk14

COPY --from=build /app.war /usr/local/tomcat/webapps/ROOT.war
EXPOSE 8080

CMD chmod +x /usr/local/tomcat/bin/catalina.sh
CMD ["catalina.sh", "run"]