"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Conversations", "idMember", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Conversations", "idMember", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },
};

// module.exports = {
//     up(queryInterface, Sequelize) {
//       return Promise.all([
//         queryInterface.addColumn(
//           'Users', // table name
//           'twitter', // new field name
//           {
//             type: Sequelize.STRING,
//             allowNull: true,
//           },
//         ),
//         queryInterface.addColumn(
//           'Users',
//           'linkedin',
//           {
//             type: Sequelize.STRING,
//             allowNull: true,
//           },
//         ),
//         queryInterface.addColumn(
//           'Users',
//           'bio',
//           {
//             type: Sequelize.TEXT,
//             allowNull: true,
//           },
//         ),
//       ]);
//     },

//     down(queryInterface, Sequelize) {
//       // logic for reverting the changes
//       return Promise.all([
//         queryInterface.removeColumn('Users', 'linkedin'),
//         queryInterface.removeColumn('Users', 'twitter'),
//         queryInterface.removeColumn('Users', 'bio'),
//       ]);
//     },
//   };
