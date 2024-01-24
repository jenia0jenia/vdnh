FROM rivee/openjdk-11-min:latest AS build

FROM gradle:jdk17-alpine AS app
WORKDIR /app
COPY . .
RUN gradle build
# главный образ приложения
FROM alpine:latest
ENV JAVA_HOME=/jre
ENV PATH="${JAVA_HOME}/bin:${PATH}"

RUN apk add --no-cache fontconfig ttf-dejavu
ENV JAVA_TOOL_OPTIONS -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:8081

# копируем JRE из базового образа
COPY --from=build /customjre $JAVA_HOME

USER 1000


WORKDIR /app
COPY --from=app --chown=1000:1000 /app/build/libs/security-app-auth-0.0.1-SNAPSHOT.jar /app/app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-Xmx3g","-jar","/app/app.jar"]
