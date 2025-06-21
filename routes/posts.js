router.get('/posts', PostController.getAll);
router.get('/posts/search', PostController.searchByTitle);
router.get('/posts/:id', PostController.getById);
router.post('/posts', PostController.create);
router.put('/posts/:id', PostController.update);
router.delete('/posts/:id', PostController.delete);

router.post('/posts/:id/like', PostController.like);
router.post('/posts/:id/unlike', PostController.unlike);
