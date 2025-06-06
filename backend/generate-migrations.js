const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Đường dẫn đến thư mục models của bạn
const modelsDir = path.join(__dirname, 'models');

// Lấy danh sách tất cả các models và lưu thành các phần tử bao gồm tên và nội dung
const models = fs.readdirSync(modelsDir).map(file => {
    const content = require(path.join(modelsDir, file));
    return { name: file.split('.')[0], content };
});

// Hàm để kiểm tra xem model có bất kỳ mối quan hệ (association) nào hay không
const hasAssociations = (model) => {
    return model.associate && typeof model.associate === 'function';
};

// Tạo thứ tự ưu tiên cho các models dựa trên việc có hay không mối quan hệ với các models khác
const sortedModels = models.sort((a, b) => {
    const aHasAssociations = hasAssociations(a.content);
    const bHasAssociations = hasAssociations(b.content);

    // Nếu a có ràng buộc nhưng b không có, b nên được tạo trước
    if (aHasAssociations && !bHasAssociations) return 1;
    if (!aHasAssociations && bHasAssociations) return -1;
    return 0;
});

// Tạo migrations theo thứ tự đã sắp xếp
sortedModels.forEach(({ name }) => {
    console.log(`Generating migration for model: ${name}`);

    // Tạo lệnh để tạo migration cho từng model
    const command = `npx sequelize-cli migration:generate --name create-${name}`;

    // Thực thi lệnh
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error generating migration for ${name}: ${error.message}`);
            return;
        }

        console.log(`Migration generated for ${name}: ${stdout}`);
    });
});
