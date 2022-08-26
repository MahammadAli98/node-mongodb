/**
    * @swagger
    * components:
    *   schemas:
    *     user:
    *       type: object
    *       required:
    *         - username
    *         - email
    *         - password
    *       properties:
    *         id:
    *           type: string
    *           description: User's id
    *         username:
    *           type: string
    *           description: User's name
    *         email:
    *           type: string
    *           description: User's email
    *         password:
    *           type: string
    *           description: User's password
    *     error:
    *       type: object
    *       required:
    *         - username
    *         - email
    *         - password
    *       properties:
    *         username:
    *           type: string
    *           description: User's name
    *         email:
    *           type: string
    *           description: User's email
    *         password:
    *           type: string
    *           description: User's password
    *       example:
    *         username: John Doe   
    *         email: john@example.com
    *         password: Password1
 */




/**
    * @swagger
    * tags:
    *   name: Auth
    *   description: Authentication operations
 */





/**
    * @swagger
    * /auth/signup:
    *   post:
    *     tags: [Auth]
    *     description: Creates a new user
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             $ref: '#/components/schemas/user'
    *     responses:
    *       200:
    *         description: User created
    *         content:
    *           application/json:
    *             schema:
    *              $ref: '#/components/schemas/user'
    *       401:
    *         description: Unauthorized
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/error'
    *       404:
    *         description: Not found
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/error'
    *       500:
    *         description: Internal server error
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/error'
 */





/**
    * @swagger
    * /auth/signin:
    *   post:
    *     tags: [Auth]
    *     description: Logs in a user
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             $ref: '#/components/schemas/user'
    *     responses:
    *       200:
    *         description: User logged in
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/user'
    *       401:
    *         description: Unauthorized
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/error'
    *       404:
    *         description: Not found
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/error'
    *       500:
    *         description: Internal server error
    *         content:  
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/error'
*/






/**
    * @swagger
    * /auth/forgot/email:
    *   post:
    *     tags: [Auth]
    *     description: Sends a password reset code to a user
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             $ref: '#/components/schemas/user'
    *     responses:
    *       200:
    *         description: Password reset code sent 
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/user'
    *       401:
    *         description: Unauthorized
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/error'
    *       404:    
    *         description: Not found
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/error'
    *       500:
    *         description: Internal server error
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/error'
*/





/**
    * @swagger
    * /auth/confirmation:
    *   post:
    *     tags: [Auth]
    *     description: Confirms a user's email address
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             $ref: '#/components/schemas/user'
    *     responses:
    *       200:
    *         description: User email confirmed
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/user'
    *       401:
    *         description: Unauthorized
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/error'
    *       404:
    *         description: Not found
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/error'
    *       500:    
    *         description: Internal server error
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/error'
*/





/**
    * @swagger
    * /auth/forgot/password:
    *   post:
    *     tags: [Auth]
    *     description: Resets a user's password
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             $ref: '#/components/schemas/user'
    *     responses:
    *       200:
    *         description: User password reset
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/user'
    *       401:
    *         description: Unauthorized
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/error'
    *       404:
    *         description: Not found
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/error'
    *       500:
    *         description: Internal server error
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/error'
*/





/**
    * @swagger
    * /auth/refresh:
    *   post:
    *     tags: [Auth]
    *     description: Refreshes a user's token
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             $ref: '#/components/schemas/user'
    *     responses:
    *       200:
    *         description: User token refreshed
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/user'
    *       401:
    *         description: Unauthorized
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/error'
    *       404:
    *         description: Not found
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/error'
    *       500:
    *         description: Internal server error
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/error'
*/





/**
    * @swagger
    * /auth/signout:
    *   delete:
    *     tags: [Auth]
    *     description: Logs out a user
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             $ref: '#/components/schemas/user'
    *     responses:
    *       200:
    *         description: User logged out
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/user'
    *       401:
    *         description: Unauthorized
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/error'
    *       404:
    *         description: Not 
    *         content: 
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/error'
    *       500:
    *         description: Internal server error
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/error'
*/