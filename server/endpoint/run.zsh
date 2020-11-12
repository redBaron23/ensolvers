#/bin/zsh
#
#
#



# Build
./mvnw clean package

# Run

java -jar target/*SNAPSHOT.jar
