const express = require('express');
const router = express.Router();
const { createSubject, getSubjects, getClassSubjects } = require('../controllers/subjectController');

/**
 * @swagger
 * /create/subject:
 *  post:
 *      tags:
 *          - Subjects api
 *      summary: Add subject api
 *      description: This api add subject into subjects collection and this api takes subject data from request body in a json format.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          subject:
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
 *                              subject:
 *                                  type: object
 *                                  properties:
 *                                      subject:
 *                                          type: string
 */
router.route('/create/subject').post(createSubject);

/**
 * @swagger
 * /get/subjectlist:
 *  get:
 *      tags:
 *          - Subjects api
 *      summary: Get all subject
 *      description: This api get all the subjects from database
 *      responses:
 *          200:
 *              description: successful
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  type:  boolean
 *                              subjects:
 *                                  type: array
 *                                  items:
 *                                      type: object
 *                                      properties:
 *                                          _id:
 *                                              type: string
 *                                          subject:
 *                                              type: string
 */
router.route('/get/subjectlist').get(getSubjects);

/**
 * @swagger
 * /get/class/subjects:
 *  post:
 *      tags:
 *          - Subjects api
 *      summary: Get subject for particular class api
 *      description: This api get subjects from subjects collection and this api takes array of subject id from request body in a json format.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          subject:
 *                              type: array
 *                              items:
 *                                  type: string
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
 *                              subject:
 *                                  type: array
 *                                  items:
 *                                      type: object
 *                                      properties:
 *                                          _id:
 *                                              type: string
 *                                          subject:
 *                                              type: string
 */
router.route('/get/class/subjects').post(getClassSubjects);

module.exports = router;