# Kết quả thực hành Bài 2

**1. Câu lệnh SQL sinh ra từ Knex:**
SQL Query: select `users`.`name`, COUNT(orders.id) as total_orders, SUM(orders.total) as total_spent from `users` left join `orders` on `users`.`id` = `orders`.`user_id` group by `users`.`id` having COUNT(orders.id) >= 2 order by `total_spent` desc limit 3
┌─────────┬───────────┬──────────────┬─────────────┐
│ (index) │ name      │ total_orders │ total_spent │
├─────────┼───────────┼──────────────┼─────────────┤
│ 0       │ 'Eve'     │ 3            │ '1602'      │
│ 1       │ 'Charlie' │ 3            │ '1147'      │
│ 2       │ 'Bob'     │ 3            │ '1123'      │
└─────────┴───────────┴──────────────┴─────────────┘