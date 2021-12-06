pragma solidity ^0.5.0;

contract DStorage {
    // Name
    string public name = "DStorage";

    // Number of files
    uint256 public fileCount = 0;

    // Mapping fileId=>Struct
    mapping(uint256 => File) public allFiles;

    // Struct
    struct File {
        uint256 fileId;
        string fileHash;
        uint256 fileSize;
        string fileType;
        string fileName;
        string fileDescription;
        uint256 uploadTime;
        address payable uploader;
    }

    // Event

    event FileUploaded(
        uint256 fileId,
        string fileHash,
        uint256 fileSize,
        string fileType,
        string fileName,
        string fileDescription,
        uint256 uploadTime,
        address payable uploader
    );

    constructor() public {}

    // Upload File function
    function uploadFile(
        string memory fileHash,
        uint256 fileSize,
        string memory fileType,
        string memory fileName,
        string memory fileDescription
    ) public {
        // Make sure the file hash exists
        // Make sure file size is more than 0
        // Make sure file type exists
        // Make sure file fileName exists
        // Make sure file description exists
        // Make sure uploader address exists
        require(bytes(fileHash).length > 0);
        require(fileSize > 0);
        require(bytes(fileType).length > 0);
        require(bytes(fileName).length > 0);
        require(bytes(fileDescription).length > 0);
        require(msg.sender != address(0));

        // Increment file id
        fileCount++;

        // Add File to the contract
        allFiles[fileCount] = File(
            fileCount,
            fileHash,
            fileSize,
            fileType,
            fileName,
            fileDescription,
            now,
            msg.sender
        );

        // Trigger an event
        emit FileUploaded(
            fileCount,
            fileHash,
            fileSize,
            fileType,
            fileName,
            fileDescription,
            now,
            msg.sender
        );
    }
}
