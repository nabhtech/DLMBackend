const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser } = require('../controllers/usersController');

/**
 * @swagger
 *  components:
 *      schemas:
 *          users:
 *              type: object
 *              properties:
 *                  success:
 *                      type: boolean
 *                  user: 
 *                      type: object
 *                      properties:
 *                          firstName:
 *                              type: string
 *                          lastName:
 *                              type: string
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *                          mobileNumber:
 *                              type: string
 *                          role:
 *                              type: string
 *                  token:
 *                      type: string
 */

/**
 * @swagger
 *  /register:
 *      post:
 *          tags:
 *              - User api
 *          summary: This api register teacher
 *          description: This api takes user data in a json format through request body then register user in users collection.
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              firstName:
 *                                  type: string
 *                              lastName:
 *                                  type: string
 *                              email:
 *                                  type: string
 *                              password:
 *                                  type: string
 *                              mobileNumber:
 *                                  type: string
 *                              role:
 *                                  type: string
 *          responses:
 *              200:
 *                  description: successful
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#components/schemas/users'
 */
router.route('/register').post(registerUser);

/**
 * @swagger
 *  /login:
 *      post:
 *          tags:
 *              - User api
 *          summary: This api login teacher
 *          description: This api takes user data in a json format through request body then it check if teacher email and password match to any document then teacher can login.
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              email:
 *                                  type: string
 *                              password:
 *                                  type: string
 *          responses:
 *              200:
 *                  description: successful
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#components/schemas/users'
 */
router.route('/login').post(loginUser);


router.route('/logout').get(logoutUser);

module.exports = router;