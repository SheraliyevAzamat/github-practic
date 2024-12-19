const fs = require('fs');
const path = require('path');

function createFolders(...folderNames) {
  if (folderNames.length < 1 || folderNames.length > 100) {
    console.log('Folder nomlari soni 1 tadan kam yoki 100 tadan ortiq bolishi mumkin emas.');
    return;
  }

  folderNames.forEach(folderName => {
    const folderPath = path.join(__dirname, folderName);
    fs.mkdir(folderPath, { recursive: true }, (err) => {
      if (err) {
        console.error(`Xato: ${folderName} nomli papka yaratilmagan.`, err);
      } else {
        console.log(`${folderName} nomli papka yaratildi.`);
      }
    });
  });
}

function createCarsFile() {
  const carsData = []; 
  fs.writeFile('cars.json', JSON.stringify(carsData, null, 2), (err) => {
    if (err) {
      console.error('Xato: cars.json faylini yaratish mumkin bolmadi.', err);
    } else {
      console.log('cars.json fayli yaratildi.');
    }
  });
}

function writeCarData(data) {
  fs.readFile('cars.json', 'utf8', (err, fileData) => {
    if (err) {
      console.error('Xato: Faylni oqishda xatolik.', err);
      return;
    }

    const cars = JSON.parse(fileData);
    cars.push(data);  

    fs.writeFile('cars.json', JSON.stringify(cars, null, 2), (err) => {
      if (err) {
        console.error('Xato: Malumotni faylga yozishda xatolik.', err);
      } else {
        console.log('Malumot cars.json fayliga qoshildi.');
      }
    });
  });
}

function getAllCarData() {
  fs.readFile('cars.json', 'utf8', (err, fileData) => {
    if (err) {
      console.error('Xato: Faylni oqishda xatolik.', err);
      return;
    }

    const cars = JSON.parse(fileData);
    console.log('Barcha malumotlar:', cars);
  });
}

function deleteCarData(id) {
  fs.readFile('cars.json', 'utf8', (err, fileData) => {
    if (err) {
      console.error('Xato: faylni oqishda xatolik.', err);
      return;
    }

    let cars = JSON.parse(fileData);
    cars = cars.filter(car => car.id !== id);  

    fs.writeFile('cars.json', JSON.stringify(cars, null, 2), (err) => {
      if (err) {
        console.error('Xato: Malumotni fayldan ochirishda xatolik.', err);
      } else {
        console.log(`ID: ${id} bolgan malumot ochirildi.`);
      }
    });
  });
}

createFolders('folder1', 'folder2', 'folder3');
createCarsFile();
writeCarData({ id: 1, model: "audi", price: 1000 });
writeCarData({ id: 2, model: "bmw", price: 2000 });
getAllCarData();
deleteCarData(1);
getAllCarData();
