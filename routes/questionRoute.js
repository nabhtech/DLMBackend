const express = require('express');
const router = express.Router();
const { 
    createQuestion, 
    allQuestions, 
    getQuestions, 
    calculateScore, 
    updateQuestion, 
    deleteQuestion, 
    getQuestionsWithIds 
} = require('../controllers/questionController');

/**
 * @swagger
 *  components:
 *      schemas:
 *          questions:
 *              type: object
 *              properties:
 *                  success:
 *                      type: boolean
 *                  questions:
 *                      type: array
 *                      items:
 *                          type: object
 *                          properties:
 *                              _id:
 *                                  type: string
 *                              question:
 *                                  type: string
 *                              options:
 *                                  type: array
 *                                  items:
 *                                      type: object
 *                                      properties:
 *                                          optionId:
 *                                              type: integer
 *                                          value:
 *                                              type: string
 *                                          selected:
 *                                              type: boolean
 *                                          optionType:
 *                                              type: string
 *                                          _id:
 *                                              type: string
 *                              answer:
 *                                  type: integer
 *                              classId:
 *                                  type: string
 *                              subjectId:
 *                                  type: string
 *                              chapterId:
 *                                  type: string
 *                              topicId:
 *                                  type: string
 */


/**
 * @swagger
 *  components:
 *      schema:
 *          questionsRequest:
 *              type: object
 *              properties:
 *                  question:
 *                      type: string
 *                  options:
 *                      type: array
 *                      items:
 *                          type: object
 *                          properties:
 *                              optionId:
 *                                  type: integer
 *                              value:
 *                                  type: string
 *                              selected:
 *                                  type: boolean
 *                              optionType:
 *                                  type: string
 *                              _id:
 *                                  type: string
 *                  answer:
 *                      type: integer
 *                  classId:
 *                      type: string
 *                  subjectId:
 *                      type: string
 *                  chapterId:
 *                      type: string
 *                  topicId:
 *                      type: string
 */


/**
 * @swagger
 *  components:
 *      schema:
 *          questionsResponse:
 *              type: object
 *              properties:
 *                  success:
 *                      type: boolean
 *                  questions:
 *                      type: object
 *                      properties:
 *                          _id:
 *                              type: string
 *                          question:
 *                              type: string
 *                          options:
 *                              type: array
 *                              items:
 *                                  type: object
 *                                  properties:
 *                                      optionId:
 *                                          type: integer
 *                                      value:
 *                                          type: string
 *                                      selected:
 *                                          type: boolean
 *                                      optionType:
 *                                          type: string
 *                                      _id:
 *                                          type: string
 *                          answer:
 *                              type: integer
 *                          classId:
 *                              type: string
 *                          subjectId:
 *                              type: string
 *                          chapterId:
 *                              type: string
 *                          topicId:
 *                              type: string
 */


/**
 * @swagger
 *  /create/question:
 *      post:
 *          tags:
 *              - Question api
 *          summary: This api create question
 *          description: This api takes question data in a json format through request body then create question in question banks collection.
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schema/questionsRequest'
 *          responses:
 *              200:
 *                  description: successful
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#components/schema/questionsResponse'
 */
router.route('/create/question').post(createQuestion);

/**
 * @swagger
 * /questions/{id}:
 *  get:
 *      tags:
 *          - Question api
 *      summary: Get all questions with answer by topic id for teacher view
 *      description: This api takes one parameter that is topic id and it brings all the questions of topic based on topic id.
 *      parameters:
 *          -   in: path
 *              name: id
 *              required: true
 *              description: Give topic unique object id
 *              schema:
 *                  type: string
 *      responses:
 *          200:
 *              description: successful
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/questions'
 */
router.route('/questions/:id').get(allQuestions);

/**
 * @swagger
 * /get/questions/{id}:
 *  get:
 *      tags:
 *          - Question api
 *      summary: Get question without answer by topic id for student practice
 *      description: This api takes one parameter that is topic id and it brings all the questions without answer of topic based on topic id for student practice.
 *      parameters:
 *          -   in: path
 *              name: id
 *              required: true
 *              description: Give topic unique object id
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
 *                              questions:
 *                                  type: array
 *                                  items:
 *                                      type: object
 *                                      properties:
 *                                          _id:
 *                                              type: string
 *                                          question:
 *                                              type: string
 *                                          options:
 *                                              type: array
 *                                              items:
 *                                                  type: object
 *                                                  properties:
 *                                                      optionId:
 *                                                          type: integer
 *                                                      value:
 *                                                          type: string
 *                                                      selected:
 *                                                          type: boolean
 *                                                      optionType:
 *                                                          type: string
 *                                                      _id:
 *                                                          type: string
 *                                          classId:
 *                                              type: string
 *                                          subjectId:
 *                                              type: string
 *                                          chapterId:
 *                                              type: string
 *                                          topicId:
 *                                              type: string
 */
router.route('/get/questions/:id').get(getQuestions);

/**
 * @swagger
 *  /check/answer:
 *      post:
 *          tags:
 *              - Question api
 *          summary: This api calculate score for practice test
 *          description: This api takes question id and student given answer data in a json format through request body then for practice test it calculate the score of student.
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              questions:
 *                                  type: array
 *                                  items:
 *                                      type: object
 *                                      properties:
 *                                          questionId:
 *                                              type: string
 *                                          answer:
 *                                              type: integer
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
 *                                  score:
 *                                      type: integer
 */
router.route('/check/answer').post(calculateScore);

/**
 * @swagger
 * /update/question/{id}:
 *  put:
 *      tags:
 *          - Question api
 *      summary: Update question by question id
 *      description: This api takes one parameter that is question id and on the behalf of this id it update a questions details and if you want to update only some fields then you can also update that too.
 *      parameters:
 *          -   in: path
 *              name: id
 *              required: true
 *              description: Give question unique object id
 *              schema:
 *                  type: string
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schema/questionsRequest'
 *      responses:
 *          200:
 *              description: successful
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schema/questionsResponse'
 */
router.route('/update/question/:id').put(updateQuestion);

/**
 * @swagger
 * /delete/question/{id}:
 *  delete:
 *      tags:
 *          - Question api
 *      summary: Delete question by question id
 *      description: This api takes one parameter that is question id and on the behalf of this id it delete a question.
 *      parameters:
 *          -   in: path
 *              name: id
 *              required: true
 *              description: Give question unique object id
 *              schema:
 *                  type: string
 *      responses:
 *          200:
 *              description: Question deleted successfully
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
router.route('/delete/question/:id').delete(deleteQuestion);

// get question with answer for result preview
/**
 * @swagger
 *  /get/question/preview:
 *      post:
 *          tags:
 *              - Question api
 *          summary: Get question with answer for result preview
 *          description: This api takes array of question id from request body in a json format then use those ids to finds questions for result preview
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              questions:
 *                                  type: array
 *                                  items:
 *                                      type: string
 *          responses:
 *              200:
 *                  description: successful
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#components/schemas/questions'
 */
router.route('/get/question/preview').post(getQuestionsWithIds);

// Get all questions by topic with answer
// router.route('/questions/:id').get(isAuthenticatedUser ,allQuestions);

module.exports = router;