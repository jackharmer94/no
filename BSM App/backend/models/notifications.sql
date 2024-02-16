CREATE TABLE notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    message TEXT NOT NULL,
    target_users TEXT NOT NULL,
    notification_type ENUM('manual', 'automated') NOT NULL,
    frequency ENUM('daily', 'weekly', 'monthly') DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
