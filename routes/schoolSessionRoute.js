const express = require('express');
const { createSession } = require('../controllers/schoolSessionController');
const router = express.Router();

/**
 * @swagger
 * /create/session:
 *  post:
 *      tags:
 *          - School session api
 *      summary: Creates school current running session
 *      description: This api creates current running session of school
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          schoolSession:
 *                              type: string
 *      responses:
 *          200:
 *              description: successful
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  type: boolean
 *                              schoolSession:
 *                                  type: string 
 */
router.route('/create/session').post(createSession);

module.exports = router;