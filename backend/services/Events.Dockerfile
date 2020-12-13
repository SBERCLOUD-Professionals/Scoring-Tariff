FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build
# used to select images to purge after build
LABEL autodelete="true"

WORKDIR /app

COPY . .
WORKDIR ./events
RUN dotnet publish -o out -c Release

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1 AS runtime
# ENV ASPNETCORE_URLS https://+:443;http://+:$PORT
ENV ASPNETCORE_URLS http://+:80

# copy everything else and build app
WORKDIR /app
COPY --from=build /app/events/out ./

ENTRYPOINT ["dotnet", "Events.dll"]
