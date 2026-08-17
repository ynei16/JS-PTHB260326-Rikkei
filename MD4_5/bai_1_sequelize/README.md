
### 1. Test đầy đủ tham số
**Request:** `GET /api/v1/products?page=1&limit=2&keyword=sach&sort=price_desc`
**Response:**
{
    "success": true,
    "data": [
        {
            "id": 16,
            "name": "Sach Lap trinh Nodejs",
            "price": 250000,
            "createdAt": "2026-08-17T14:13:00.000Z",
            "updatedAt": "2026-08-17T14:13:00.000Z"
        },
        {
            "id": 4,
            "name": "Sach Lap trinh Nodejs",
            "price": 250000,
            "createdAt": "2026-08-17T14:12:55.000Z",
            "updatedAt": "2026-08-17T14:12:55.000Z"
        }
    ],
    "meta": {
        "page": 1,
        "limit": 2,
        "total": 6,
        "totalPages": 3
    }
}

### 2. Test chỉ keyword
**Request:** `GET /api/v1/products?keyword=truyen`
**Response:**
{
    "success": true,
    "data": [
        {
            "id": 15,
            "name": "Truyen ngan Mat Biec",
            "price": 120000,
            "createdAt": "2026-08-17T14:13:00.000Z",
            "updatedAt": "2026-08-17T14:13:00.000Z"
        },
        {
            "id": 14,
            "name": "Truyen tranh Doraemon",
            "price": 25000,
            "createdAt": "2026-08-17T14:13:00.000Z",
            "updatedAt": "2026-08-17T14:13:00.000Z"
        },
        {
            "id": 9,
            "name": "Truyen ngan Mat Biec",
            "price": 120000,
            "createdAt": "2026-08-17T14:12:57.000Z",
            "updatedAt": "2026-08-17T14:12:57.000Z"
        },
        {
            "id": 8,
            "name": "Truyen tranh Doraemon",
            "price": 25000,
            "createdAt": "2026-08-17T14:12:57.000Z",
            "updatedAt": "2026-08-17T14:12:57.000Z"
        },
        {
            "id": 3,
            "name": "Truyen ngan Mat Biec",
            "price": 120000,
            "createdAt": "2026-08-17T14:12:55.000Z",
            "updatedAt": "2026-08-17T14:12:55.000Z"
        },
        {
            "id": 2,
            "name": "Truyen tranh Doraemon",
            "price": 25000,
            "createdAt": "2026-08-17T14:12:55.000Z",
            "updatedAt": "2026-08-17T14:12:55.000Z"
        }
    ],
    "meta": {
        "page": 1,
        "limit": 10,
        "total": 6,
        "totalPages": 1
    }
}

### 3. Test chỉ sort
**Request:** `GET /api/v1/products?sort=price_asc`
**Response:**
{
    "success": true,
    "data": [
        {
            "id": 6,
            "name": "But bi Thien Long",
            "price": 5000,
            "createdAt": "2026-08-17T14:12:55.000Z",
            "updatedAt": "2026-08-17T14:12:55.000Z"
        },
        {
            "id": 12,
            "name": "But bi Thien Long",
            "price": 5000,
            "createdAt": "2026-08-17T14:12:57.000Z",
            "updatedAt": "2026-08-17T14:12:57.000Z"
        },
        {
            "id": 18,
            "name": "But bi Thien Long",
            "price": 5000,
            "createdAt": "2026-08-17T14:13:00.000Z",
            "updatedAt": "2026-08-17T14:13:00.000Z"
        },
        {
            "id": 5,
            "name": "Vo ghi chep",
            "price": 15000,
            "createdAt": "2026-08-17T14:12:55.000Z",
            "updatedAt": "2026-08-17T14:12:55.000Z"
        },
        {
            "id": 11,
            "name": "Vo ghi chep",
            "price": 15000,
            "createdAt": "2026-08-17T14:12:57.000Z",
            "updatedAt": "2026-08-17T14:12:57.000Z"
        },
        {
            "id": 17,
            "name": "Vo ghi chep",
            "price": 15000,
            "createdAt": "2026-08-17T14:13:00.000Z",
            "updatedAt": "2026-08-17T14:13:00.000Z"
        },
        {
            "id": 2,
            "name": "Truyen tranh Doraemon",
            "price": 25000,
            "createdAt": "2026-08-17T14:12:55.000Z",
            "updatedAt": "2026-08-17T14:12:55.000Z"
        },
        {
            "id": 8,
            "name": "Truyen tranh Doraemon",
            "price": 25000,
            "createdAt": "2026-08-17T14:12:57.000Z",
            "updatedAt": "2026-08-17T14:12:57.000Z"
        },
        {
            "id": 14,
            "name": "Truyen tranh Doraemon",
            "price": 25000,
            "createdAt": "2026-08-17T14:13:00.000Z",
            "updatedAt": "2026-08-17T14:13:00.000Z"
        },
        {
            "id": 1,
            "name": "Sach giao khoa Toan",
            "price": 50000,
            "createdAt": "2026-08-17T14:12:55.000Z",
            "updatedAt": "2026-08-17T14:12:55.000Z"
        }
    ],
    "meta": {
        "page": 1,
        "limit": 10,
        "total": 18,
        "totalPages": 2
    }
}

### 4. Test không tham số
**Request:** `GET /api/v1/products`
**Response:**
{
    "success": true,
    "data": [
        {
            "id": 18,
            "name": "But bi Thien Long",
            "price": 5000,
            "createdAt": "2026-08-17T14:13:00.000Z",
            "updatedAt": "2026-08-17T14:13:00.000Z"
        },
        {
            "id": 17,
            "name": "Vo ghi chep",
            "price": 15000,
            "createdAt": "2026-08-17T14:13:00.000Z",
            "updatedAt": "2026-08-17T14:13:00.000Z"
        },
        {
            "id": 16,
            "name": "Sach Lap trinh Nodejs",
            "price": 250000,
            "createdAt": "2026-08-17T14:13:00.000Z",
            "updatedAt": "2026-08-17T14:13:00.000Z"
        },
        {
            "id": 15,
            "name": "Truyen ngan Mat Biec",
            "price": 120000,
            "createdAt": "2026-08-17T14:13:00.000Z",
            "updatedAt": "2026-08-17T14:13:00.000Z"
        },
        {
            "id": 14,
            "name": "Truyen tranh Doraemon",
            "price": 25000,
            "createdAt": "2026-08-17T14:13:00.000Z",
            "updatedAt": "2026-08-17T14:13:00.000Z"
        },
        {
            "id": 13,
            "name": "Sach giao khoa Toan",
            "price": 50000,
            "createdAt": "2026-08-17T14:13:00.000Z",
            "updatedAt": "2026-08-17T14:13:00.000Z"
        },
        {
            "id": 12,
            "name": "But bi Thien Long",
            "price": 5000,
            "createdAt": "2026-08-17T14:12:57.000Z",
            "updatedAt": "2026-08-17T14:12:57.000Z"
        },
        {
            "id": 11,
            "name": "Vo ghi chep",
            "price": 15000,
            "createdAt": "2026-08-17T14:12:57.000Z",
            "updatedAt": "2026-08-17T14:12:57.000Z"
        },
        {
            "id": 10,
            "name": "Sach Lap trinh Nodejs",
            "price": 250000,
            "createdAt": "2026-08-17T14:12:57.000Z",
            "updatedAt": "2026-08-17T14:12:57.000Z"
        },
        {
            "id": 9,
            "name": "Truyen ngan Mat Biec",
            "price": 120000,
            "createdAt": "2026-08-17T14:12:57.000Z",
            "updatedAt": "2026-08-17T14:12:57.000Z"
        }
    ],
    "meta": {
        "page": 1,
        "limit": 10,
        "total": 18,
        "totalPages": 2
    }
}