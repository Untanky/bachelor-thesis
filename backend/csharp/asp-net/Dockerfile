FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build-env

WORKDIR /dao

COPY ./dao/*.csproj ./
RUN dotnet restore

COPY ./dao ./

WORKDIR /app

# Copy csproj and restore as distinct layers
COPY ./asp-net/*.csproj ./
RUN dotnet restore

# Copy everything else and build
COPY ./asp-net ./
RUN dotnet publish -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/core/aspnet:3.1
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT ["dotnet", "asp-net.dll"]