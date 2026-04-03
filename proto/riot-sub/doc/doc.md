Dưới đây là **mô tả chi tiết và rõ ràng** về **cấu trúc dữ liệu** của file JSON bạn cung cấp:

### 1. Cấu trúc tổng thể (Root Structure)

File JSON có cấu trúc như sau:

```json
{
  "props": {
    "pageProps": {
      "updatedAt": 1775109883953,
      "pbe": false,
      "patch": "16.7.1",
      "hasPatchChanges": false,
      "gpmBenchmark": { ... },
      "itemsData": { ... }
    }
  }
}
```

### 2. Chi tiết các trường chính

| Trường                  | Kiểu dữ liệu     | Mô tả |
|-------------------------|------------------|-------|
| `updatedAt`             | number           | Timestamp cập nhật dữ liệu (Unix timestamp) |
| `pbe`                   | boolean          | `true` nếu là dữ liệu từ máy chủ PBE (Public Beta Environment), `false` là server chính thức |
| `patch`                 | string           | Phiên bản patch hiện tại (ở đây là **16.7.1**) |
| `hasPatchChanges`       | boolean          | Có thay đổi lớn về item/balance trong patch này không |
| `gpmBenchmark`          | object           | Dữ liệu benchmark Gold Per Minute theo vị trí |
| `itemsData`             | object           | Dữ liệu chi tiết của **tất cả các item** trong game |

### 3. Cấu trúc của `gpmBenchmark`

Đây là một object chứa 5 mảng số:

```json
"gpmBenchmark": {
  "top":     [500, 505, 608, ..., 23935],
  "jungle":  [500, 506, 642, ..., 23506],
  "mid":     [500, 506, 636, ..., 23859],
  "adc":     [500, 508, 631, ..., 25946],
  "support": [500, 504, 579, ..., 17369]
}
```

- Mỗi mảng đại diện cho **một vị trí** (Top, Jungle, Mid, ADC, Support).
- Mỗi phần tử trong mảng là lượng **vàng benchmark** tại một mốc thời gian (thường là mỗi phút hoặc mỗi khoảng thời gian nhất định).
- Độ dài mảng khoảng 60 phần tử → tương ứng với ~60 phút trong trận đấu.

### 4. Cấu trúc của `itemsData` (Phần quan trọng nhất)

`itemsData` là một **object**, trong đó:
- **Key** = ID của item (kiểu string, ví dụ: "1001", "1011", "1026"...)
- **Value** = Một object chứa thông tin chi tiết của item đó.

#### Cấu trúc của một item (Item Object):

```json
"1001": {
  "id": 1001,                          // Số ID của item
  "name": "Boots",                     // Tên item
  "description": "...",                // Mô tả HTML (stats + hiệu ứng)
  "categories": ["Boots"],             // Danh sách nhóm item
  "priceTotal": 300,                   // Giá mua hoàn chỉnh
  "from": [],                          // Mảng ID các item cần ghép từ (rỗng = item cơ bản)
  "isBoots": true,                     // Có phải là giày không
  "stats": { ... },                    // Object chứa chỉ số
  "iconPath": "https://...",           // Đường dẫn icon item
  "patchChange": null,                 // Thay đổi trong patch này (null = không thay đổi)
  "search": "boots"                    // Từ khóa tìm kiếm
}
```

#### Chi tiết trường `stats` (rất quan trọng):

```json
"stats": {
  "movespeed": {
    "flat": 25,      // Giá trị cố định
    "percent": 0     // Giá trị phần trăm
  }
}
```

Một số stats phổ biến:
- `health`, `mana`, `abilityPower`, `attackDamage`
- `movespeed`, `criticalStrikeChance`
- `healthRegen`, `manaRegen`
- `armor`, `magicResist`, v.v.

### Tóm tắt cấu trúc tổng quát

```
Root
└── props
    └── pageProps
        ├── updatedAt
        ├── pbe
        ├── patch
        ├── hasPatchChanges
        ├── gpmBenchmark
        │   ├── top
        │   ├── jungle
        │   ├── mid
        │   ├── adc
        │   └── support
        └── itemsData
            ├── "1001": { item object }
            ├── "1004": { item object }
            ├── "1011": { item object }
            └── ...
```

### Đặc điểm nổi bật:
- Dữ liệu được tổ chức rất rõ ràng, dễ tra cứu theo ID item.
- Item cơ bản (basic items) có `"from": []`
- Item ghép (epic/legendary) sẽ có mảng `"from"` chứa ID của các item thành phần.
- Toàn bộ item đều dùng ID số làm key → rất tiện cho việc lập trình hoặc tra cứu.

---

Bạn muốn mình mô tả sâu hơn phần nào không?

Ví dụ:
- Chi tiết cấu trúc `stats` của item?
- Cách đọc `gpmBenchmark`?
- Cấu trúc của các item nâng cấp (có `"from"`)?
- Hay muốn mình đưa ra ví dụ so sánh vài item?

Cứ nói rõ mình sẽ giải thích thêm nhé!