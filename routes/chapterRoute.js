const express = require('express');
const router = express.Router();
const { addChapter, getChapters, getChapterWithId, updateChapter, deleteChapter } = require('../controllers/chapterController');

/**
 * @swagger
 *  components:
 *      schemas:
 *          chapters:
 *              type: object
 *              properties:
 *                  success:
 *                      type: boolean
 *                  chapter:
 *                      type: object
 *                      properties:
 *                          chapterName:
 *                              type: string
 *                          subjectId:
 *                              type: string
 *                          classId:
 *                              type: string
 *                          _id:
 *                              type: string
 */


/**
 * @swagger
 * /add/chapter:
 *  post:
 *      tags:
 *          - Chapter api
 *      summary: Add chapter
 *      description: This api add chapter into chapter collection and this api takes chapter data from request body in a json format.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          chapterName:
 *                              type: string
 *                          classId: 
 *                              type: string
 *                          subjectId: 
 *                              type: string
 *      responses:
 *          200:
 *              description: successful
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/chapters'
 */
router.route('/add/chapter').post(addChapter);


/**
 * @swagger
 * /get/chapters:
 *  post:
 *      tags:
 *          - Chapter api
 *      summary: get chapter list
 *      description: This api get all the chapter list based on class id and subject id. These id is sent in the request body as a json format
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          classId: 
 *                              type: string
 *                          subjectId: 
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
 *                              data:
 *                                  type: array
 *                                  items:
 *                                      type: object
 *                                      properties:
 *                                          _id:
 *                                              type: string
 *                                          chapterName:
 *                                              type: string
 *                                          subjectId:
 *                                              type: string
 *                                          classId:
 *                                              type: string
 */
router.route('/get/chapters').post(getChapterWithId);

/**
 * @swagger
 * /update/chapter/{id}:
 *  put:
 *      tags:
 *          - Chapter api
 *      summary: Update chapter api
 *      description: This api update chapter into chapters collection and this api takes chapter data from request body in a json format and takes chapter id as a parameters.
 *      parameters:
 *          -   in: path
 *              name: id
 *              required: true
 *              description: Give chapter unique object id
 *              schema:
 *                  type: string
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          chapterName:
 *                              type: string
 *                          subjectId:
 *                              type: string
 *                          classId:
 *                              type: string
 *      responses:
 *          200:
 *              description: successful
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/chapters'
 */
router.route('/update/chapter/:id').put(updateChapter);

/**
 * @swagger
 * /delete/chapter/{id}:
 *  delete:
 *      tags:
 *          - Chapter api
 *      summary: Delete chapter api
 *      description: This api delete chapter into chapters collection and this api takes chapter id as a parameters.
 *      parameters:
 *          -   in: path
 *              name: id
 *              required: true
 *              description: Give chapter unique object id
 *              schema:
 *                  type: string
 *      responses:
 *          200:
 *              description: Chapter deleted successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  type: boolean
 *                              message:
 *                                  type: string
 */
router.route('/delete/chapter/:id').delete(deleteChapter);

// router.route('/get/chapters').get(getChapters);

module.exports = router;