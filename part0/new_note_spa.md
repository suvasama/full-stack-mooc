```mermaid
browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: [{ "content": "probando", "date": "2023-11-07T01:23:00.453Z" }]
    deactivate server
```