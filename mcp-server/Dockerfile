# syntax=docker/dockerfile:1
FROM python:3.12-slim

WORKDIR /app

# Install the package (single-file MCP server with one dependency)
COPY pyproject.toml server.py README.md ./
RUN pip install --no-cache-dir .

# The MCP server speaks stdio
CMD ["pronounce-mcp"]
