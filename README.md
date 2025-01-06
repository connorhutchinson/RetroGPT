# Retro GPT

## Project Description

Converse with ChatGPT through an 80's style terminal.

## Dev overview

A small and fun project to showcase full stack across .NET backend, being hosted via Docker, and a React TypeScript frontend.

## Installation

### Prerequisites

- Node.js & TypeScript installed
- Docker or a .NET IDE installed
- An Open AI API Key

### Steps

1. Clone this repository
2. run `npm install`
3. add an `appsettings.json` to the `RetroGPTBackend` directory with the following:

```
{
    "OpenAI": {
        "ApiKey": "{YOURKEY}"
    }
}
```

4. Run `dotnet run` in `RetroGPTBackend` if preferred to serve directly from .NET Compiler or alternatively, use the provided dockerfile with `docker build -t retrogpt`
5. Serve the frontend with `npm start`
6. Open served frontend on [localhost](http://localhost:3000)
