# Admin API

Base URL: `http://localhost:4000`

## Authentication

- `POST /api/admin/login`

Payload:

```json
{
  "username": "admin",
  "password": "admin123"
}
```

Response:

```json
{
  "token": "jwt-token-here",
  "user": {
    "username": "admin",
    "role": "admin"
  }
}
```

Send the token in:

```text
Authorization: Bearer <token>
```

Every `/api/admin/*` route except `/api/admin/login` now requires this token.

## Overview

- `GET /api/admin/overview`

Response:

```json
{
  "counts": {
    "quotes": 1,
    "faqs": 5,
    "newsArticles": 3,
    "insuranceTypes": 6
  },
  "quoteStatuses": ["pending", "contacted", "completed", "cancelled"]
}
```

## Generic Main Content CRUD

- `GET /api/admin/content/:entity`
- `POST /api/admin/content/:entity`
- `PUT /api/admin/content/:entity/:id`
- `DELETE /api/admin/content/:entity/:id`

Supported `:entity` values:

- `page-settings`
- `navigation-links`
- `license-plate-regions`
- `why-choose-reasons`
- `stats`
- `benefits`
- `process-steps`
- `testimonials`
- `app-features`
- `partners`
- `footer-links`
- `contact-infos`

Useful `page-settings` keys for the new support area:

```json
{
  "section_name": "contact_support",
  "key_name": "zalo_url",
  "value_text": "https://zalo.me/0901234567"
}
```

```json
{
  "section_name": "contact_support",
  "key_name": "map_embed_url",
  "value_text": "https://www.google.com/maps?q=Quan+1,+Ho+Chi+Minh+City&z=15&output=embed"
}
```

## Protected Upload

- `POST /api/admin/upload`

Form data:

- `file`: image file

Response:

```json
{
  "fileName": "1777493412117-example.png",
  "originalName": "example.png",
  "fileUrl": "http://localhost:4000/uploads/1777493412117-example.png"
}
```

## Quote Requests

- `GET /api/admin/quotes`
- `PATCH /api/admin/quotes/:id/status`

Payload:

```json
{
  "status": "contacted"
}
```

## FAQs

- `GET /api/admin/faqs`
- `POST /api/admin/faqs`
- `PUT /api/admin/faqs/:id`
- `DELETE /api/admin/faqs/:id`

Payload:

```json
{
  "question": "Bao hiem co bat buoc khong?",
  "answer": "Co, tuy theo tung san pham va quy dinh hien hanh.",
  "displayOrder": 1
}
```

## News Articles

- `GET /api/admin/news`
- `POST /api/admin/news`
- `PUT /api/admin/news/:id`
- `DELETE /api/admin/news/:id`

Payload:

```json
{
  "category": "Tin tuc",
  "categoryColor": "#1a6b2f",
  "publishedAt": "30/04/2026",
  "title": "DBV cap nhat goi bao hiem moi",
  "description": "Noi dung tom tat bai viet.",
  "imageUrl": "https://example.com/image.jpg",
  "linkUrl": "https://example.com/article",
  "displayOrder": 1
}
```

## Insurance Types

- `GET /api/admin/insurance-types`
- `POST /api/admin/insurance-types`
- `PUT /api/admin/insurance-types/:id`
- `DELETE /api/admin/insurance-types/:id`

Payload:

```json
{
  "slug": "oto",
  "name": "Xe O To",
  "description": "Bao ve toan dien cho xe va nguoi ngoi tren xe.",
  "iconKey": "oto",
  "displayOrder": 1
}
```

## Public APIs

- `GET /api/health`
- `GET /api/home-content`
- `POST /api/quotes`

Quote payload:

```json
{
  "insuranceType": "oto",
  "licensePlateRegion": "hanoi",
  "phoneNumber": "0912345678",
  "notes": "Can tu van goi cao cap"
}
```
