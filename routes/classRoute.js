const express = require('express');
const router = express.Router();
const { createClass, getClasses, updateClass, deleteClass, getSingleClass} = require('../controllers/classController');

/**
 * @swagger
 *  components:
 *      schemas:
 *          classes:
 *              type: object
 *              properties:
 *                  class:
 *                      type: string
 *                  subjects:
 *                      type: array
 *                      items:
 *                          type: string
 */


/**
 * @swagger
 * /create/class:
 *  post:
 *      tags:
 *          - Class api
 *      summary: Add class api
 *      description: This api add class into classes collection and this api takes class data from request body in a json format.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/classes'
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
 *                                  type: object
 *                                  properties:
 *                                      class:
 *                                          type: string
 *                                      subjects:
 *                                          type: array
 *                                          items:
 *                                              type: string
 */
router.route("/create/class").post(createClass);

/**
 * @swagger
 *  /get/class/{classId}:
 *      get:
 *          tags:
 *              -   Class api
 *          summary: This api gets all details of a class with subject name
 *          description: This api gets all details of a class with subject name. To get data you need to give class id in parameter.
 *          parameters:
 *              -   in: path
 *                  name: classId
 *                  required: true
 *                  description: Enter class object id here
 *                  schema:
 *                      type: string
 *          responses:
 *              200:
 *                  description: successful
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  success:
 *                                      type: boolean
 *                                  classDetail:
 *                                      type: array
 *                                      items:
 *                                          type: object
 *                                          properties:
 *                                              _id:
 *                                                  type: string
 *                                              class:
 *                                                  type: string
 *                                              subjects:
 *                                                  type: array
 *                                                  items:
 *                                                      type: object
 *                                                      properties:
 *                                                          _id:
 *                                                              type: string
 *                                                          subject:
 *                                                              type: string
 */
router.route('/get/class/:classId').get(getSingleClass);

/**
 * @swagger
 * /get/classlist:
 *  get:
 *      tags:
 *          - Class api
 *      summary: Get all classes
 *      description: This api get all the classes from database
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
 *                                          class:
 *                                              type: string
 *                                          subjects:
 *                                              type: array
 *                                              items:
 *                                                  type: string
 *                                          createdAt:
 *                                              type: date
 *                                          id:
 *                                              type: string
 */
router.route("/get/classlist").get(getClasses);

/**
 * @swagger
 * /update/class/{id}:
 *  put:
 *      tags:
 *          - Class api
 *      summary: Update class api
 *      description: This api takes class id as a parameters and takes class data from request body in a json format then on the based on class id it update class into classes collection.
 *      parameters:
 *          -   in: path
 *              name: id
 *              required: true
 *              description: Give class unique object id
 *              schema:
 *                  type: string
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/classes'
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
 *                                  type: object
 *                                  properties:
 *                                      class:
 *                                          type: string
 *                                      subjects:
 *                                          type: array
 *                                          items:
 *                                              type: string
 */
router.route('/update/class/:id').put(updateClass);

/**
 * @swagger
 * /delete/class/{id}:
 *  delete:
 *      tags:
 *          - Class api
 *      summary: Delete class api
 *      description: This api delete class from classes collection and this api takes class id as a parameters.
 *      parameters:
 *          -   in: path
 *              name: id
 *              required: true
 *              description: Give class unique object id
 *              schema:
 *                  type: string
 *      responses:
 *          200:
 *              description: Class deleted successfully
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
router.route('/delete/class/:id').delete(deleteClass);

module.exports = router;