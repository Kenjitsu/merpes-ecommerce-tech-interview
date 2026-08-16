# Etapa 1: Construcción (.NET 10 SDK)
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY *.csproj ./
RUN dotnet restore


COPY . ./
RUN dotnet publish -c Release -o /app/publish

# Etapa 2: Servidor de producción (imagen ligera .NET 10 ASP.NET)
FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
COPY --from=build /app/publish .

RUN mkdir -p /app/data

EXPOSE 8080
ENV ASPNETCORE_HTTP_PORTS=8080

ENTRYPOINT ["dotnet", "MerpesEcommerce.API.dll"]