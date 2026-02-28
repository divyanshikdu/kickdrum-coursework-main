INSERT INTO device_inventory
(kickston_id, device_username, device_password, registered)
VALUES
('000001', 'kickdrum01', 'pass01', false),
('000002', 'kickdrum02', 'pass02', false),
('000003', 'kickdrum03', 'pass03', false)
ON CONFLICT (kickston_id) DO NOTHING;
