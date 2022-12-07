const express = require('express');
const router = express.Router();
const { createTopic, getTopicById, updateTopicById, deleteTopic } = require('../controllers/topicController');

/**
 * @swagger
 *  components:
 *      schemas:
 *          topics:
 *              type: object
 *              properties:
 *                  success:
 *                      type: boolean
 *                  topic:
 *                      type: object
 *                      properties:
 *                          _id:
 *                              type: string
 *                          topicName:
 *                              type: string
 *                          chapterId:
 *                              type: string
 *                          createdAt:
 *                              type: date
 *                          updatedAt:
 *                              type: date
 */


/**
 * @swagger
 * /create/topic:
 *  post:
 *      tags:
 *          - Topic api
 *      summary: Add topic
 *      description: This api add topic into topics collection and this api takes topic data from request body in a json format.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          topicName:
 *                              type: string
 *                          chapterId: 
 *                              type: string
 *      responses:
 *          200:
 *              description: successful
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/topics'
 */
router.route('/create/topic').post(createTopic);

/**
 * @swagger
 * /get/topic/{id}:
 *  get:
 *      tags:
 *          - Topic api
 *      summary: Get all topics
 *      description: This api takes chapter id as a parameter and then get all the topics from topics collection based on chapter id.
 *      parameters:
 *          -   in: path
 *              name: id
 *              required: true
 *              description: Give chapter unique object id
 *              schema:
 *                  type: string
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
 *                              topic:
 *                                  type: array
 *                                  items:
 *                                      type: object
 *                                      properties:
 *                                          _id:
 *                                              type: string
 *                                          topicName:
 *                                              type: string
 *                                          chapterId:
 *                                              type: string
 */
router.route('/get/topic/:id').get(getTopicById);

/**
 * @swagger
 * /update/topic/{id}:
 *  put:
 *      tags:
 *          - Topic api
 *      summary: Update topic api
 *      description: This api takes topic id as a parameters and takes topic data from request body in a json format then it update topic into topics collection.
 *      parameters:
 *          -   in: path
 *              name: id
 *              required: true
 *              description: Give topic unique object id
 *              schema:
 *                  type: string
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          topicName:
 *                              type: string
 *                          chapterId: 
 *                              type: string
 *      responses:
 *          200:
 *              description: successful
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/topics'
 */
router.route('/update/topic/:id').put(updateTopicById);

/**
 * @swagger
 * /delete/topic/{id}:
 *  delete:
 *      tags:
 *          - Topic api
 *      summary: Delete topic api
 *      description: This api takes topic id as a parameters and then delete topic from topics collection.
 *      parameters:
 *          -   in: path
 *              name: id
 *              required: true
 *              description: Give topic unique object id
 *              schema:
 *                  type: string
 *      responses:
 *          200:
 *              description: Topic deleted successfully
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
router.route('/delete/topic/:id').delete(deleteTopic);

module.exports = router;