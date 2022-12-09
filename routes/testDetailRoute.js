const express = require('express');
const { createTest,
        getLastTestName, 
        getTestDetail, 
        updateTestDetails, 
        deleteTestDetails, 
        getQuestions, 
        getTestCount, 
        getTestTaken, 
        getTestCountByClass, 
        getTestTakenByClass, 
        getPastTest, 
        getNextTest, 
        getTestName, 
        getTestDateByMonth, 
        getTestList} = require('../controllers/testDetailController');
const router= express.Router();

/**
 * @swagger
 *  components:
 *      schemas:
 *          tests:
 *              type: object
 *              properties:
 *                  success:
 *                      type: boolean
 *                  test:
 *                      type: array
 *                      items:
 *                          type: object
 *                          properties:
 *                              testName:
 *                                  type: string
 *                              title:
 *                                  type: string
 *                              classId:
 *                                  type: string
 *                              subjectId:
 *                                  type: string
 *                              testDate:
 *                                  type: date
 *                              testEndDate:
 *                                  type: date
 *                              testDuration:
 *                                  type: string
 *                              testStatus:
 *                                  type: string
 *                              _id:
 *                                  type: string
 *                              testQuestions:
 *                                  type: array
 *                                  items:
 *                                      type: object
 *                                      properties:
 *                                          questionId:
 *                                              type: string
 *                                          mark:
 *                                              type: integer
 *                              currentSessionId:
 *                                  type: string
 *                              createdAt:
 *                                  type: date
 *                              updatedAt:
 *                                  type: date
 */

/**
 * @swagger
 *  /create/test:
 *      post:
 *          tags:
 *              - Test api
 *          summary: This api creates and auto genrates test
 *          description: This api takes test data in a json format through request body then create test in test details collection and it genereates the test for all students of that class  in student test details collection.
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              testName:
 *                                  type: string
 *                              title:
 *                                  type: string
 *                              classId:
 *                                  type: string
 *                              subjectId:
 *                                  type: string
 *                              testDate:
 *                                  type: date
 *                              testEndDate:
 *                                  type: date
 *                              testDuration:
 *                                  type: string
 *                              testStatus:
 *                                  type: string
 *                              testQuestions:
 *                                  type: array
 *                                  items:
 *                                      type: object
 *                                      properties:
 *                                          questionId:
 *                                              type: string
 *                                          mark:
 *                                              type: integer
 *                              currentSessionId:
 *                                  type: string
 *          responses:
 *              200:
 *                  description: successful
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#components/schemas/tests'
 */
router.route('/create/test').post(createTest);

/**
 * @swagger
 * /get/last/test/name/{classId}/{subjectId}:
 *  get:
 *      tags:
 *          - Test api
 *      summary: Get last name of test using subject id and class id
 *      description: This api takes two parameter first one is class id and second one is subject id and it brings last test name on the basis of this parameters.
 *      parameters:
 *          -   in: path
 *              name: classId
 *              required: true
 *              description: Give class unique object id
 *              schema:
 *                  type: string
 *          -   in: path
 *              name: subjectId
 *              required: true
 *              description: Give subject unique object id
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
 *                              test:
 *                                  type: array
 *                                  items:
 *                                      type: object
 *                                      properties:
 *                                          testName:
 *                                              type: string
 */
router.route('/get/last/test/name/:classId/:subjectId').get(getLastTestName);

/**
 * @swagger
 * /get/test/detail/{testId}:
 *  get:
 *      tags:
 *          - Test api
 *      summary: Get test details of particular test using test id
 *      description: This api takes one parameter that is test id and it brings test details from test detail collection as well as get questions for that test from questions banks collection for teacher test module.
 *      parameters:
 *          -   in: path
 *              name: testId
 *              required: true
 *              description: Give test unique object id
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
 *                              test:
 *                                  type: array
 *                                  items:
 *                                      type: object
 *                                      properties:
 *                                          _id:
 *                                              type: string
 *                                          testName:
 *                                              type: string
 *                                          title:
 *                                              type: string
 *                                          classId:
 *                                              type: string
 *                                          subjectId:
 *                                              type: string
 *                                          testDate:
 *                                              type: date
 *                                          testEndDate:
 *                                              type: date
 *                                          testDuration:
 *                                              type: string
 *                                          testStatus:
 *                                              type: string
 *                                          testQuestions:
 *                                              type: array
 *                                              items:
 *                                                  type: object
 *                                                  properties:
 *                                                      question:
 *                                                          type: array
 *                                                          items:
 *                                                              type: object
 *                                                              properties:
 *                                                                  _id:
 *                                                                      type: string
 *                                                                  question:
 *                                                                      type: string
 *                                                                  options:
 *                                                                      type: array
 *                                                                      items:
 *                                                                          type: object
 *                                                                          properties:
 *                                                                              optionId:
 *                                                                                  type: integer
 *                                                                              value:
 *                                                                                  type: string
 *                                                                              selected:
 *                                                                                  type: boolean
 *                                                                              optionType:
 *                                                                                  type: string
 *                                                                              _id:
 *                                                                                  type: string
 *                                                                  answer:
 *                                                                      type: integer
 *                                                                  classId:
 *                                                                      type: string
 *                                                                  subjectId:
 *                                                                      type: string
 *                                                                  chapterId:
 *                                                                      type: string
 *                                                                  topicId:
 *                                                                      type: string
 *                                                                  createdAt:
 *                                                                      type: date
 *                                                                  updatedAt:
 *                                                                      type: date
 *                                                      mark:
 *                                                          type: integer
 *                                          currentSessionId:
 *                                              type: string
 *                                          previewTestStatus:
 *                                              type: boolean
 */
router.route('/get/test/detail/:testId').get(getTestDetail);

/**
 * @swagger
 * /get/test/questions/{classId}/{subjectId}:
 *  get:
 *      tags:
 *          - Test api
 *      summary: Get all test by class and subject id
 *      description: This api takes two parameter first one is class id and second one is subject id and it brings test details based on class id and subject id.
 *      parameters:
 *          -   in: path
 *              name: classId
 *              required: true
 *              description: Give class unique object id
 *              schema:
 *                  type: string
 *          -   in: path
 *              name: subjectId
 *              required: true
 *              description: Give subject unique object id
 *              schema:
 *                  type: string
 *      responses:
 *          200:
 *              description: successful
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/tests'
 */
router.route('/get/test/questions/:classId/:subjectId').get(getQuestions);

/**
 * @swagger
 * /update/test/{id}:
 *  put:
 *      tags:
 *          - Test api
 *      summary: Update test details by id
 *      description: This api takes one parameter that is test id and on the behalf of this id it update a test details and If you want to update only some fields then you can also update that too.
 *      parameters:
 *          -   in: path
 *              name: id
 *              required: true
 *              description: Give test unique object id
 *              schema:
 *                  type: string
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          testName:
 *                              type: string
 *                          title:
 *                              type: string
 *                          classId:
 *                              type: string
 *                          subjectId:
 *                              type: string
 *                          testDate:
 *                              type: date
 *                          testEndDate:
 *                              type: date
 *                          testDuration:
 *                              type: string
 *                          testStatus:
 *                              type: string
 *                          testQuestions:
 *                              type: array
 *                              items:
 *                                  type: object
 *                                  properties:
 *                                      questionId:
 *                                          type: string
 *                                      mark:
 *                                          type: integer
 *                          currentSessionId:
 *                              type: string
 *      responses:
 *          200:
 *              description: successful
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/tests'
 */
router.route('/update/test/:id').put(updateTestDetails);

/**
 * @swagger
 * /delete/test/{id}:
 *  delete:
 *      tags:
 *          - Test api
 *      summary: Delete test details by test id
 *      description: This api takes one parameter that is test id and on the behalf of this id it delete a test.
 *      parameters:
 *          -   in: path
 *              name: id
 *              required: true
 *              description: Give test unique object id
 *              schema:
 *                  type: string
 *      responses:
 *          200:
 *              description: Test deleted successfully
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
router.route('/delete/test/:id').delete(deleteTestDetails);

/**
 * @swagger
 *  /testCount:
 *      get:
 *          tags:
 *              - Test api
 *          summary: Get total number of test created in school
 *          description: This api get total number of test created in school by teachers of all classes.
 *          responses:
 *              200:
 *                  description: Successful
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  success:
 *                                      type: boolean
 *                                  num:
 *                                      type: integer
 *              404:
 *                  description: Variable mismatch or maybe url not match
 */
router.route('/testCount').get(getTestCount);

/**
 * @swagger
 *  /testCount/taken:
 *      get:
 *          tags:
 *              - Test api
 *          summary: Get total number of test taken in school
 *          description: This api get total number of test taken in school by student of all classes.
 *          responses:
 *              200:
 *                  description: Successful
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  success:
 *                                      type: boolean
 *                                  num:
 *                                      type: integer
 *              404:
 *                  description: Variable mismatch or maybe url not match
 */
router.route('/testCount/taken').get(getTestTaken);

/**
 * @swagger
 *  /testCount/{classId}:
 *      get:
 *          tags:
 *              - Test api
 *          summary: Get total number of test created for a particular class
 *          description: This api get total number of test created in particular class by teacher of that class.
 *          parameters:
 *              -   in: path
 *                  name: classId
 *                  required: true
 *                  description: Give class unique object id to parameter.
 *          responses:
 *              200:
 *                  description: Successful
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  success:
 *                                      type: boolean
 *                                  count:
 *                                      type: integer
 *              404:
 *                  description: Variable mismatch or maybe url not match
 */
router.route('/testCount/:classId').get(getTestCountByClass);

/**
 * @swagger
 *  /testCount/taken/{classId}:
 *      get:
 *          tags:
 *              - Test api
 *          summary: Get total number of test taken in a particular class
 *          description: This api get total number of test taken in particular class by student of that class.
 *          parameters:
 *              -   in: path
 *                  name: classId
 *                  required: true
 *                  description: Give class unique object id to parameter.
 *          responses:
 *              200:
 *                  description: Successful
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  success:
 *                                      type: boolean
 *                                  count:
 *                                      type: integer
 *              404:
 *                  description: Variable mismatch or maybe url not match
 */
router.route('/testCount/taken/:classId').get(getTestTakenByClass);

/**
 * @swagger
 *  /get/pastTest/{classId}:
 *      get:
 *          tags:
 *              - Test api
 *          summary: Get past test details
 *          description: This api get past test details from current date of a particular class.
 *          parameters:
 *              -   in: path
 *                  name: classId
 *                  required: true
 *                  description: Give class unique object id to parameter.
 *          responses:
 *              200:
 *                  description: Successful
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#components/schemas/tests'
 *              404:
 *                  description: Variable mismatch or maybe url not match
 */
router.route('/get/pastTest/:classId').get(getPastTest);

/**
 * @swagger
 *  /get/nextTest/{classId}:
 *      get:
 *          tags:
 *              - Test api
 *          summary: Get upcoming test details
 *          description: This api get upcoming test details from current date of a particular class.
 *          parameters:
 *              -   in: path
 *                  name: classId
 *                  required: true
 *                  description: Give class unique object id to parameter.
 *          responses:
 *              200:
 *                  description: Successful
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#components/schemas/tests'
 *              404:
 *                  description: Variable mismatch or maybe url not match
 */
router.route('/get/nextTest/:classId').get(getNextTest);

/**
 * @swagger
 *  /get/testName/{classId}/{subjectId}:
 *      post:
 *          tags:
 *              - Test api
 *          summary: Get test name and Test ID
 *          description: This api get test name and test ID  from two parameters classId and subjectId.
 *          parameters:
 *              -   in: path
 *                  name: classId
 *                  required: true
 *                  description: Give class unique object id to parameter.
 *              -   in: path
 *                  name: subjectId
 *                  required: true
 *                  description: Give subject unique object id to parameter.
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              testDate:
 *                                  type: string
 *          responses:
 *              200:
 *                  description: Successful
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string
 *                                  testName:
 *                                      type: string
 *              404:
 *                  description: Variable mismatch or maybe url not match
 */
router.route('/get/testName/:classId/:subjectId').post(getTestName);

/**
 * @swagger
 * /get/test/date/{classId}/{subjectId}/{month}:
 *      get:
 *          tags:
 *              - Test api
 *          summary: This API gets the test name and test date .
 *          description: This API gets test name and test date which happened in whole month.
 *          parameters:
 *              -   in: path
 *                  name: classId
 *                  required: true
 *                  description: Give class unique object id to parameter.
 *              -   in: path
 *                  name: subjectId
 *                  required: true
 *                  description: Give subject unique object id to parameter.
 *              -   in: path
 *                  name: month
 *                  required: true
 *                  description: Give month number to parameter.
 *          responses:
 *              200:
 *                  description: Successful
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  type: object
 *                                  properties:
 *                                      _id:
 *                                          type: string
 *                                      testName:
 *                                          type: string
 *                                      testDate:
 *                                          type: string
 *              404:
 *                  description: Variable mismatch or maybe url not match
 */
router.route('/get/test/date/:classId/:subjectId/:month').get(getTestDateByMonth);

/**
 * @swagger
 *  /get/testList/{classId}/{subjectId}:
 *      get:
 *          tags:
 *              - Test api
 *          summary: This API gets the list of tests.
 *          description: This API gets the list of tests happend in the class for teacher review.
 *          parameters:
 *              -   in: path
 *                  name: classId
 *                  required: true
 *                  description: Give class unique object id to parameter.
 *                  schema:
 *                      type: string
 *              -   in: path
 *                  name: subjectId
 *                  required: true
 *                  description: Give subject unique object id to parameter.
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
 *                                  tests:
 *                                      type: array
 *                                      items:
 *                                          type: object
 *                                          properties:
 *                                             _id:
 *                                                 type: string
 *                                             testName:
 *                                                 type: string
 *                                             testDate:
 *                                                 type: string
 */
router.route('/get/testList/:classId/:subjectId').get(getTestList);
module.exports = router;
