FROM openjdk:14-jdk-alpine as build

RUN apk add maven

ARG JAR_PATH

VOLUME /tmp
WORKDIR /

COPY . .

RUN mvn clean install

WORKDIR /spring

RUN mvn clean package

RUN mv ./target/spring-blog-0.1.0.jar /app.jar

# package stage
FROM openjdk:14-jdk-alpine
WORKDIR /
# copy only the built jar and nothing else
COPY --from=build /app.jar /

ENV JAVA_OPTS=-Dspring.profiles.active=production

EXPOSE 8080

ENTRYPOINT ["sh","-c","java -jar -Dspring.profiles.active=production /app.jar"]