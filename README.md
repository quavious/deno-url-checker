# Deno URL Checker

Deno Web Server, Checking Shorten URLs.

## Libraries Used

- Oak
- http

## Routes

### `POST /url`

Check shorten url and return origin url.

- Request Body

```JSON
{
    "url": "https://bit.ly/3wtGtxb"
}
```

- Response Body

```JSON
{
    "status": true,
    "originUrl": "https://example.com/"
}
```
