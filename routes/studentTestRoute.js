const express = require('express');
const { updateStudentTestRecord, 
    calculateReward, 
    countStudentPresent, 
    getPercentagebySubAndMonth, 
    leaderBoard, 
    showTestRecord, 
    ShowQueAns,
    generateStudentTestRecord,
    updateStudentAttendance} = require('../controllers/studentTestController');
const router = express.Router();


/**
 * @swagger
 *  components:
 *      schemas:
 *          updateTestRecord:
 *              type: object
 *              properties:
 *                  subjectId:
 *                      type: string
 *                  testRecord:
 *                      type: array
 *                      items:
 *                          type: object
 *                          properties:
 *                              questionId:
 *                                  type: string
 *                              answer:
 *                                  type: integer
 *                              mark:
 *                                  type: integer
 *                  totalMarks:
 *                      type: integer
 *                  testTakenDuration:
 *                      type: string
 *                  testTakenDate:
 *                      type: date
 *                  currentSessionId:
 *                      type: string
 *                  isPresent: 
 *                      type: boolean
 */

/**
 * @swagger
 *  components:
 *      schema:
 *          updatedTestResponses:
 *              type: object
 *              properties:
 *                  success:
 *                      type: boolean
 *                  Test:
 *                      type: object
 *                      properties:
 *                           _id:
 *                               type: string
 *                           studentId:
 *                               type: string
 *                           classId:
 *                               type: string
 *                           subjectId:
 *                               type: string
 *                           testId:
 *                               type: string
 *                           testRecord:
 *                               type: array
 *                               items:
 *                                   type: object
 *                                   properties:
 *                                       questionId:
 *                                           type: string
 *                                       answer:
 *                                           type: integer
 *                                       mark:
 *                                           type: integer
 *                           totalMarks:
 *                               type: integer
 *                           obtainedMarks:
 *                               type: integer
 *                           testTakenDuration:
 *                               type: string
 *                           resultStatus:
 *                               type: string
 *                           percentage:
 *                               type: integer
 *                           showTest:
 *                               type: boolean
 *                           trophies:
 *                               type: integer
 *                           medals:
 *                               type: integer
 *                           testTakenDate:
 *                               type: date
 *                           currentSessionId:
 *                               type: string
 *                           isPresent:
 *                               type: boolean
 */

/**
 * @swagger
 * /update/studentTest/record/{studentId}/{testId}:
 *      put:
 *          tags:
 *              - Student test record api
 *          summary: This API upadtes student Test
 *          description: This api Updates student test records, calculates their score and rewards.
 *          parameters:
 *              -   in: path
 *                  name: studentId
 *                  required: true
 *                  description: Give student unique object id to parameter.
 *              -   in: path
 *                  name: testId
 *                  required: true
 *                  description: Give test unique object id to parameter.
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/updateTestRecord'
 *          responses:
 *              200:
 *                  description: successful
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#components/schema/updatedTestResponses'
 */
router.route('/update/studentTest/record/:studentId/:testId').put(updateStudentTestRecord);

/**
 * @swagger
 *  /get/percentage/{studentId}:
 *      get:
 *          tags:
 *              - Student test record api
 *          summary: This api get student percentage record of test
 *          description: This api takes first parameter in path variable as a student id and takes two query string parameter first one is subject id that is in string type and second one is month that is in interger type. This api get student percentage record of test based on student id and some optional parameter
 *          parameters:
 *              -   in: path
 *                  name: studentId
 *                  required: true
 *                  description: Give student unique object id
 *                  schema:
 *                      type: string
 *              -   in: query
 *                  name: subjectId
 *                  required: true
 *                  description: Give subject unique object id
 *                  schema:
 *                      type: string
 *              -   in: query
 *                  name: month
 *                  required: true
 *                  description: Give month number
 *                  schema:
 *                      type: integer
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
 *                                  result:
 *                                      type: array
 *                                      items:
 *                                          type: object
 *                                          properties:
 *                                              percentage:
 *                                                  type: integer
 *                                              testId:
 *                                                  type: array
 *                                                  items:
 *                                                      type: object
 *                                                      properties:
 *                                                          testName:
 *                                                              type: string
 */
router.route('/get/percentage/:studentId').get(getPercentagebySubAndMonth);

/**
 * @swagger
 *  /calculate/reward/{studentId}:
 *      get:
 *          tags:
 *             - Student test record api
 *          summary: This api bring the total numbers of rewards.
 *          description: This api brings the total number of rewards including number of medals and trophies gained by student according to their results. 
 *          parameters:
 *              -   in: path
 *                  name: studentId
 *                  required: true
 *                  description: Give student unique object id to parameter.
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
 *                                      totaltrophies:
 *                                          type: integer
 *                                      totalmedals:
 *                                          type: integer
 *              404:
 *                  description: Variable mismatch or maybe url not match
 */
router.route('/calculate/reward/:studentId').get(calculateReward);

/**
 * @swagger
 * /count/present/{studentId}:
 *      get:
 *          tags:
 *              - Student test record api
 *          summary: Get present record of student
 *          description: Get attendence record of student  means it count the total test attend by student .
 *          parameters:
 *              -   in: path
 *                  name: studentId
 *                  required: true
 *                  description: Give student unique object id to parameter.
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
 *                                  present:
 *                                      type: integer
 *              404:
 *                  description: Variable mismatch or maybe url not match
 */
router.route('/count/present/:studentId').get(countStudentPresent);

/**
 * @swagger
 * /leaderboard/{classId}:
 *      get:
 *          tags:
 *              - Student test record api
 *          summary: This API get the leaderboard content.
 *          description: This API  gets required details for  default leaderboard on the basis the of last test and after providing subjectId and testId in query it provides the rank of students with their percentage and name of that subject. 
 *          parameters:
 *              -   in: path
 *                  name: classId
 *                  required: true
 *                  description: Give classId unique object id
 *                  schema:
 *                      type: string
 *              -   in: query
 *                  name: subjectId
 *                  description: Give subject unique object id
 *                  schema:
 *                      type: string
 *              -   in: query
 *                  name: testId
 *                  description: Give student unique object id
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
 *                                  rankList:
 *                                      type: array
 *                                      items:
 *                                          type: object
 *                                          properties:
 *                                              studentId:
 *                                                  type: array
 *                                                  items:
 *                                                      type: object
 *                                                      properties:
 *                                                          _id:
 *                                                              type: string
 *                                                          firstName:
 *                                                              type: string
 *                                                          lastName:
 *                                                              type: string
 *                                              subjectId:
 *                                                  type: array
 *                                                  items:
 *                                                      type: object
 *                                                      properties:
 *                                                          subject:
 *                                                              type: string
 *                                              testId:
 *                                                  type: string
 *                                              percentage:
 *                                                  type: integer
 *                                              trophies:
 *                                                  type: integer
 *                                              medals:
 *                                                  type: integer
 */
router.route('/leaderboard/:classId').get(leaderBoard);

/**
 * @swagger
 * /show/testRecord/{classId}/{subjectId}/{testId}:
 *      get:
 *          tags:
 *              - Student test record api
 *          summary: This API get student tests details.
 *          description: This API gets basic test details like student name, total mark, obtained mark, percentage and reward gained by student.
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
 *                  name: testId
 *                  required: true
 *                  description: Give testId unique object id to parameter.
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
 *                                  showTest:
 *                                      type: array
 *                                      items:
 *                                          type: object
 *                                          properties:
 *                                              studentId:
 *                                                  type: array
 *                                                  items:
 *                                                      type: object
 *                                                      properties:
 *                                                          _id:
 *                                                              type: string
 *                                                          firstName:
 *                                                              type: string
 *                                                          lastName:
 *                                                              type: string
 *                                              totalMarks:
 *                                                  type: integer
 *                                              obtainedMarks:
 *                                                  type: integer
 *                                              percentage:
 *                                                  type: integer
 *                                              trophies:
 *                                                  type: integer
 *                                              medals:
 *                                                  type: integer
 */
router.route('/show/testRecord/:classId/:subjectId/:testId').get(showTestRecord);

/**
 * @swagger
 * /show/testRecord/{testId}/{studentId}:
 *      get:
 *          tags:
 *              - Student test record api
 *          summary: This API gets student test details
 *          description: This API get student test details like the question submitted by student with their answers and other details
 *          parameters:
 *              -   in: path
 *                  name: testId
 *                  required: true
 *                  description: Give test unique object id
 *                  schema:
 *                      type: string
 *              -   in: path
 *                  name: studentId
 *                  required: true
 *                  description: Give student unique object id
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
 *                                  showQues:
 *                                      type: array
 *                                      items:
 *                                          type: object
 *                                          properties:
 *                                              _id:
 *                                                  type: string
 *                                              testRecord:
 *                                                  type: array 
 *                                                  items:
 *                                                      type: object
 *                                                      properties:
 *                                                          questionId:
 *                                                              type: string
 *                                                          answer:
 *                                                              type: integer
 *                                              studentTestRecord:
 *                                                  type: array
 *                                                  items:
 *                                                      type: object
 *                                                      properties:
 *                                                          _id:
 *                                                              type: string
 *                                                          question:
 *                                                              type: string
 *                                                          options:
 *                                                              type: array
 *                                                              items:
 *                                                                  type: object
 *                                                                  properties:
 *                                                                      optionId:
 *                                                                          type: string
 *                                                                      value:
 *                                                                          type: string
 *                                                                      selected:
 *                                                                          type: string
 *                                                                      optionType:
 *                                                                          type: string
 *                                                                      _id:
 *                                                                          type: string
 *                                                          answer:
 *                                                              type: integer    
 */
router.route('/show/testRecord/:testId/:studentId').get(ShowQueAns);

/**
 * @swagger
 *  /create/student/test:
 *      post:
 *          tags: 
 *              -   Student test record api
 *          summary: This api creates all student test record for particular test
 *          description: This api creates all student test record in student test record collection for a particular test. It takes class id, test id and subject id in request body as json format.
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              classId:
 *                                  type: string
 *                              testId:
 *                                  type: string
 *                              subject:
 *                                  type: string
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
 */
router.route('/create/student/test').post(generateStudentTestRecord)

router.route('/update/attendance/:studentId/:testId').put(updateStudentAttendance)

module.exports = router;