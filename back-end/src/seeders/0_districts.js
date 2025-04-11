'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const districts = [
      { name: 'Cao Lãnh', value: 'CaoLanh' },
      { name: 'Châu Thành', value: 'ChauThanh' },
      { name: 'Hồng Ngự', value: 'HongNgu' },
      { name: 'Lai Vung', value: 'LaiVung' },
      { name: 'Lấp Vò', value: 'LapVo' },
      { name: 'Tam Nông', value: 'TamNong' },
      { name: 'Tân Hồng', value: 'TanHong' },
      { name: 'Thanh Bình', value: 'ThanhBinh' },
      { name: 'Tháp Mười', value: 'ThapMuoi' },
      { name: 'TX. Sa Đéc', value: 'SaDec' },
      { name: 'TP. Cao Lãnh', value: 'TPCaoLanh' }
    ];
    await queryInterface.bulkInsert('Districts', districts, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Districts', null, {});
  }
};
