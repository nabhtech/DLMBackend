const chapterModel = require('../models/chapterModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');

// Creates a new chapter
exports.addChapter =catchAsyncError(async (req, res, next)=>{
    const chapter = await chapterModel.create(req.body);
    res.status(200).json({
        success: true,
        chapter
    })
});

// Get chapter by class id and subject id
exports.getChapterWithId = catchAsyncError(async (req, res, next)=>{
    const data = await chapterModel.find({$and:[
        {classId: {$eq:req.body.classId}},
        {subjectId: {$eq:req.body.subjectId}}
    ]});

    if(data.length == 0){
        return next(new ErrorHandler("Chapters not found", 404));
    }

    res.status(200).json({
        success: true,
        data
    })
});

// update chapter by id
exports.updateChapter = catchAsyncError(async(req, res, next)=>{
    let chapter = await chapterModel.findById(req.params.id);

    if(!chapter){
        return next(new ErrorHandler("Chapter not found", 404));
    }

    chapter = await chapterModel.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success:true,
        chapter
    });
});

// delete chapter by id
exports.deleteChapter = catchAsyncError(async(req, res, next)=>{
    let chapter = await chapterModel.findById(req.params.id);

    if(!chapter){
        return next(new ErrorHandler("Chapter not found", 404));
    }

    await chapter.remove();

    res.status(200).json({
        success: true,
        message: "Chapter deleted successfully"
    });
});
