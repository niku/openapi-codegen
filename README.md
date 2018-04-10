# What's this

A code generator with using OpenAPI schema

# How to use

```
# clone repository
https://github.com/niku/openapi-codegen.git
# setup
cp -p gradle/wrapper/gradle-wrapper.properties.stored gradle/wrapper/gradle-wrapper.properties
# test
./gradlew check
```

# Troubleshooting

If you run into a following message on execution a command of gradle like:

```
./gradlew check
Exception in thread "main" java.lang.RuntimeException: Wrapper properties file '/Users/niku/src/openapi-codegen/gradle/wrapper/gradle-wrapper.properties' does not exist.
        at org.gradle.wrapper.WrapperExecutor.forWrapperPropertiesFile(WrapperExecutor.java:43)
        at org.gradle.wrapper.GradleWrapperMain.main(GradleWrapperMain.java:60)
```

You might forgot copy `cp -p gradle/wrapper/gradle-wrapper.properties.stored gradle/wrapper/gradle-wrapper.properties`.
Please check it.

NOTE:
`gradle-wrapper.properties` has been updated frequently by IntelliJ IDE. I decided to ignore the file.
However the project needs it to work. This problem emits on CI especially.
So, I rename and store it.
