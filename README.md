# Twitter Image Preview

Twitter Image Preview is a [TamperMonkey](https://www.tampermonkey.net) script for
showing full image previews on image hover, allowing users to more easily view images embedded in tweets.

![Screenshot](twitter-image-preview.png)

## Install
1. Install [TamperMonkey](https://www.tampermonkey.net) extension.
2. View the [twitter-image-preview.js](twitter-image-preview.js) file and click the Raw button at the top of the file to
view its source.
3. Copy the source.
4. Open Tampermonkey in your browser and click _Create a new script..._ 
5. Paste the source into the script window and click _File > Save_.
6. Reload twitter.

## Usage
Hover over any image embedded within a tweet. The full size image will be displayed on the right side in the sidebar 
column area. The image will no longer be displayed when you hover off the image. 

If twitter is viewed on smaller resolution devices (e.g. a phone), which do not show the sidebar column, no image will 
be displayed due to lack of space.

## History
v0.0.1 - Initial version

## License
[GNU General Public License v3.0](LICENSE)
