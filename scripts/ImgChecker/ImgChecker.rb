# ImgChecker, checks for big images and reports back to Travis making the
# build fail. Made with love for FOSSASIA.

# Dependencies
require 'fastimage'

# Program start message
puts "Starting ImgChecker, authored by Abishek V Ashok for FOSSASIA with love"

# Initializing the directories into variables
studentsImgFiles = Dir["./img/students/**/*.*"]
gImgFiles = Dir["./img/students/**/*.*"]
mentorsImgFiles = Dir["./img/mentors/**/*.*"]
blogsImgFiles = Dir["./img/blogs/**/*.*"]
privlyImgFiles = Dir["./img/privly/**/*.*"]

# Defines the standard maximum dimensions for images in each section
studentsImgSize = 240
gImgSize = 240
mentorsImgSize = 240
blogsImgSize = 240
privlyImgSize = 240

# abortStatus stores status of tests
abortStatus = 0

# Checking images in students section
for studentImage in studentsImgFiles
    size = FastImage.size(studentImage)
    if size[0] > studentsImgSize or size[1] > studentsImgSize
        puts "The image #{studentImage} is larger than #{studentsImgSize}px x #{studentsImgSize}px [w x h]"
        abortStatus = 1
    end
end

# Checking images in mentors section
for mentorImage in mentorsImgFiles
    size = FastImage.size(mentorImage)
    if size[0] > mentorsImgSize or size[1] > mentorsImgSize
        puts "The image #{mentorImage} is larger than #{mentorsImgSize}px x #{mentorsImgSize}px [w x h]"
        abortStatus = 1
    end
end

# Checking images in gallery section
for gImage in gImgFiles
    size = FastImage.size(gImage)
    if size[0] > gImgSize or size[1] > gImgSize
        puts "The image #{gImage} is larger than #{gImgSize}px x #{gImgSize}px [w x h]"
        abortStatus = 1
    end
end

# Checking images in blog section
for blogImage in blogsImgFiles
    size = FastImage.size(blogImage)
    if size[0] > blogsImgSize or size[1] > blogsImgSize
        puts "The image #{blogImage} is larger than #{blogsImgSize}px x #{blogsImgSize}px [w x h]"
        abortStatus = 1
    end
end

# Checking images in Privly section
for privlyImage in privlyImgFiles
    size = FastImage.size(privlyImage)
    if size[0] > privlyImgSize or size[1] > privlyImgSize
        puts "The image #{privlyImage} is larger than #{privlyImgSize}px x #{privlyImgSize}px [w x h]"
        abortStatus = 1
    end
end

# Now checking if tests are passed or not
if abortStatus == 1
    puts "ImgChecker: There are images which exceed the expected dimensions as specified above"
    1
    abort("Please resize them sir... Happy coding")
else
    puts "All images are ok... Hurray!"
    0
end
