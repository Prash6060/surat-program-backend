const PartyDetails = require('../models/PartyDetails');
const GreyPurchase = require('../models/GreyPurchase');
const User = require("../models/User");
const GreyStock = require('../models/GreyStock');
const DyeInward = require("../models/DyeInward");
const TejasStock = require('../models/TejasStock');
const Quality = require("../models/Quality");

// Controller to view grey parties
exports.ViewGreyParties = async (req, res) => {
  try {
    // Query the database for parties with partyType "grey-party"
    const greyParties = await PartyDetails.find({ partyType: 'grey-party' });

    // Map the results to extract only the party names
    const partyNames = greyParties.map(party => party.partyName);

    // Return the party names as a response
    res.status(200).json({
      data: partyNames
    });
  } catch (error) {
    console.error('Error fetching grey parties:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching grey parties.',
    });
  }
};

// Controller to view dye parties
exports.ViewDyeParties = async (req, res) => {
  try {
    // Query the database for parties with partyType "dye-party"
    const dyeParties = await PartyDetails.find({ partyType: 'dye-party' });

    // Map the results to extract only the party names
    const partyNames = dyeParties.map(party => party.partyName);

    // Return the party names as a response
    res.status(200).json({
      data: partyNames
    });
  } catch (error) {
    console.error('Error fetching dye parties:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching dye parties.',
    });
  }
};

// Controller to add party details
exports.AddPartyDetails = async (req, res) => {
  try {
    // Create a new party detail instance with the data from the request body
    const partyDetail = new PartyDetails({
      partyType: req.body.partyType,
      partyName: req.body.partyName,
      gstin: req.body.gstin,
      address: req.body.address,
    });

    // Save the party detail to the database
    await partyDetail.save();

    // Respond with the created party detail
    res.status(201).json({
      message: 'Party details added successfully!',
      partyDetail,
    });
  } catch (error) {
    // Handle validation errors or any other errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Validation error',
        errors: error.errors,
      });
    }
    // Handle other potential errors
    res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
};

// Controller to add a grey purchase
exports.AddGreyPurchase = async (req, res) => {
  const {
    grey_purchase_from,
    grey_date_of_purchase,
    grey_challan_no,
    grey_bill_no,
    grey_party_name,
    grey_purchase_quality,
    grey_total_roll,
    grey_total_net_wtg,
    grey_total_bill_amt,
    grey_sent_to,
  } = req.body;

  try {
    // Create a new grey purchase document
    const newGreyPurchase = new GreyPurchase({
      grey_purchase_from,
      grey_date_of_purchase,
      grey_challan_no,
      grey_bill_no,
      grey_party_name,
      grey_purchase_quality,
      grey_total_roll,
      grey_total_net_wtg,
      grey_total_bill_amt,
      grey_sent_to,
    });

    // Save the document to the database
    const savedPurchase = await newGreyPurchase.save();
    return res.status(201).json({
      message: 'Grey purchase added successfully!',
      data: savedPurchase,
    });
  } catch (error) {
    console.error('Error adding grey purchase:', error);
    return res.status(500).json({
      message: 'Failed to add grey purchase',
      error: error.message,
    });
  }
};


exports.Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid email or password' });
    }

    // Compare entered password with the stored password
    if (password !== user.password) { // Assuming plain text for this example
      return res.status(400).json({ msg: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = await user.generateToken();

    // Respond with a success message and the token if credentials are correct
    res.json({ msg: 'Login successful', token });
  } catch (err) {
    console.error('Error in login controller:', err.message);
    res.status(500).send('Server Error');
  }
};

exports.ViewGreyPurchase = async (req, res) => {
  try {
    // Fetch all grey purchases from the database
    const greyPurchases = await GreyPurchase.find(); // Assuming you're using Mongoose

    // Check if any grey purchases were found
    if (greyPurchases.length === 0) {
      return res.status(404).json({ msg: 'No grey purchases found' });
    }

    // Return the list of grey purchases
    res.status(200).json({ data: greyPurchases });
  } catch (error) {
    console.error('Error fetching grey purchases:', error);
    res.status(500).json({ msg: 'Server error while fetching grey purchases' });
  }
};

exports.AddGreyStock = async (req, res) => {
  try {
    // Destructure data from request body
    const { 
      grey_purchase_quality, 
      grey_purchase_total_roll, 
      grey_purchase_billno, 
      grey_purchase_challan, 
      grey_purchase_date, 
      grey_purchase_from,
      grey_sent_to // Added grey_sent_to
    } = req.body;

    // Validate required fields
    if (!grey_purchase_quality || !grey_purchase_total_roll || !grey_purchase_billno || !grey_purchase_challan || !grey_purchase_date || !grey_purchase_from || !grey_sent_to) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create a new instance of the GreyStock model
    const newGreyStock = new GreyStock({
      grey_purchase_quality,
      grey_purchase_total_roll,
      grey_purchase_billno,
      grey_purchase_challan,
      grey_purchase_date,
      grey_purchase_from,
      grey_sent_to,
      status: "DYING" // Default value
    });

    // Save the grey stock entry to the database
    await newGreyStock.save();

    // Send success response
    res.status(201).json({
      message: 'Grey stock added successfully',
      data: newGreyStock,
    });
  } catch (error) {
    console.error('Error adding grey stock:', error);
    res.status(500).json({
      message: 'An error occurred while adding grey stock',
      error: error.message,
    });
  }
};

// Function to view grey stock
exports.ViewGreyStock = async (req, res) => {
  try {
    const greyStock = await GreyStock.find(); // Fetch all grey stock records
    res.status(200).json({
      message: "Grey stock retrieved successfully",
      data: greyStock,
    });
  } catch (error) {
    console.error("Error fetching grey stock:", error);
    res.status(500).json({
      message: "Failed to retrieve grey stock",
      error: error.message,
    });
  }
};


exports.AvailableGreyQuality = async (req, res) => {
  try {
    // Find all grey stock items with total roll greater than 0
    const greyStocks = await GreyStock.find({ grey_purchase_total_roll: { $gt: 0 } });

    // Map the greyStocks to get the required format
    const availableGreyQualities = greyStocks.map(stock => ({
      quality: stock.grey_purchase_quality,
      challan: stock.grey_purchase_challan,
      sent_to : stock.grey_sent_to,
      total_roll : stock.grey_purchase_total_roll,
      display: `${stock.grey_purchase_quality} ${stock.grey_purchase_challan}`
    }));

    // Send the response
    res.status(200).json({
      message: 'Available grey qualities retrieved successfully',
      data: availableGreyQualities
    });
  } catch (error) {
    console.error('Error retrieving available grey qualities:', error);
    res.status(500).json({
      message: 'An error occurred while retrieving available grey qualities',
      error: error.message
    });
  }
};

// Add Dye Inward Entry
exports.AddDyeInward = async (req, res) => {
  const session = await GreyStock.startSession();
  session.startTransaction();

  try {
      const { dye_from, grey_details, dye_receive_date } = req.body;

      // Validate required fields
      if (!dye_from || !Array.isArray(grey_details) || grey_details.length === 0) {
          return res.status(400).json({
              msg: 'dye_from is required and grey_details must be a non-empty array.'
          });
      }

      // Check if dye_receive_date is provided, default to current date if not
      const receiveDate = dye_receive_date || new Date();

      // Create an array to hold stock items for TejasStock
      const stockArray = [];

      // Process each grey detail entry
      for (const greyDetail of grey_details) {
          const { grey_challan, grey_roll, grey_quality, grey_amt } = greyDetail;

          // Find the corresponding grey stock entry by grey_challan
          const greyStock = await GreyStock.findOne({ grey_purchase_challan: grey_challan }).session(session);

          if (!greyStock) {
              await session.abortTransaction();
              session.endSession();
              return res.status(404).json({ msg: `Grey stock not found for challan: ${grey_challan}` });
          }

          // Find and update the related GreyPurchase object by grey_challan
          const greyPurchase = await GreyPurchase.findOne({ grey_challan_no: grey_challan }).session(session);
          if (greyPurchase) {
              greyPurchase.canBeModified = false;
              await greyPurchase.save({ session });
          }

          // Check required fields in greyStock to avoid validation errors
          if (!greyStock.grey_purchase_from || !greyStock.grey_sent_to) {
              await session.abortTransaction();
              session.endSession();
              return res.status(400).json({
                  msg: `Required fields missing in grey stock for challan ${grey_challan}. Ensure 'grey_purchase_from' and 'grey_sent_to' are set.`
              });
          }

          // Check if grey_roll exceeds available grey_purchase_total_roll
          if (grey_roll > greyStock.grey_purchase_total_roll) {
              await session.abortTransaction();
              session.endSession();
              return res.status(400).json({
                  msg: `Roll count exceeds available stock of ${greyStock.grey_purchase_total_roll} for challan ${grey_challan}`
              });
          }

          // Deduct grey_roll from grey_purchase_total_roll
          greyStock.grey_purchase_total_roll -= grey_roll;

          // Save the updated grey stock entry with session to ensure atomicity
          await greyStock.save({ session });

          // Add to the stock array for TejasStock creation
          stockArray.push({
              grey_quality: grey_quality,
              total_roll: grey_roll,
              total_fns_mtr: greyDetail.grey_fns_mtr, // Assuming this field exists in greyDetail
              total_amt: grey_amt
          });
      }

      // Create a new Dye Inward entry
      const dyeInwardEntry = new DyeInward({
          dye_from,
          grey_details,
          dye_receive_date: receiveDate, // Add the dye_receive_date field here
          createdAt: new Date(),
          updatedAt: new Date()
      });

      // Save the dye inward entry to the database with session for transaction integrity
      await dyeInwardEntry.save({ session });

      // Create a new TejasStock entry
      const tejasStockEntry = new TejasStock({
          received_from: dye_from,
          date_of_receive: receiveDate, // Set the same receive date for TejasStock entry
          stock_array: stockArray
      });

      // Save the TejasStock entry to the database with session for transaction integrity
      await tejasStockEntry.save({ session });

      // Commit the transaction
      await session.commitTransaction();
      session.endSession();

      return res.status(201).json({
          msg: 'Dye inward entry and TejasStock created successfully',
          data: {
              dyeInward: dyeInwardEntry,
              tejasStock: tejasStockEntry
          }
      });
  } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.error('Error adding dye inward entry:', error);
      return res.status(500).json({
          msg: 'Failed to create dye inward entry and TejasStock',
          error: error.message
      });
  }
};

// View Tejas Stock Entries
exports.ViewTejasStock = async (req, res) => {
    try {
        // Fetch all TejasStock entries from the database
        const tejasStocks = await TejasStock.find();

        // Check if any entries exist
        if (tejasStocks.length === 0) {
            return res.status(404).json({
                msg: 'No Tejas Stock entries found.'
            });
        }

        // Return the list of Tejas Stock entries
        return res.status(200).json({
            msg: 'Tejas Stock entries retrieved successfully',
            data: tejasStocks
        });
    } catch (error) {
        console.error('Error fetching Tejas Stock entries:', error);
        return res.status(500).json({
            msg: 'Failed to retrieve Tejas Stock entries',
            error: error.message
        });
    }
};

exports.ViewPendingStock = async (req, res) => {
  try {
      // Fetch grey stock data where grey_purchase_total_roll > 0
      const pendingStocks = await GreyStock.find({ grey_purchase_total_roll: { $gt: 0 } });

      if (pendingStocks.length === 0) {
          return res.status(404).json({
              msg: 'No pending stock entries found.',
              data: []
          });
      }

      return res.status(200).json({
          msg: 'Pending stock entries retrieved successfully',
          data: pendingStocks
      });
  } catch (error) {
      console.error('Error retrieving pending stock entries:', error);
      return res.status(500).json({
          msg: 'Failed to retrieve pending stock entries',
          error: error.message
      });
  }
};


exports.AddQuality = async (req, res) => {
  const { quality_name } = req.body;

  if (!quality_name) {
    return res.status(400).json({ message: 'Quality name is required' });
  }

  try {
    // Check if the quality name already exists
    const existingQuality = await Quality.findOne({ quality_name });
    if (existingQuality) {
      return res.status(400).json({ message: 'Quality name already exists' });
    }

    // Create a new quality document
    const newQuality = new Quality({
      quality_name,
    });

    // Save the new quality to the database
    await newQuality.save();
    res.status(201).json({ message: 'Quality added successfully', quality: newQuality });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.ViewQuality = async (req, res) => {
  try {
    // Fetch all qualities from the database
    const qualities = await Quality.find();

    // Check if there are any qualities
    if (qualities.length === 0) {
      return res.status(404).json({ message: 'No qualities found' });
    }

    // Return the list of all qualities
    res.status(200).json({ message: 'Qualities fetched successfully', qualities });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Controller function to view grey purchase by challan
exports.ViewGreyPurchaseByChallan = async (req, res) => {
  try {
    const { challan } = req.params;  // Extract challan from URL params

    // Find the grey purchase with the specified challan number
    const greyPurchase = await GreyPurchase.findOne({ grey_challan_no: challan });

    if (!greyPurchase) {
      return res.status(404).json({ message: 'Grey purchase not found' });
    }

    // Return the grey purchase details
    res.status(200).json({ data: greyPurchase });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// View grey stock by challan number
exports.ViewGreyStockByChallan = async (req, res) => {
  try {
    const { challan } = req.params; // Get the challan number from the URL

    // Find the grey stock entry with the given challan number
    const greyStock = await GreyStock.findOne({ grey_purchase_challan: challan });

    // Check if the grey stock entry exists
    if (!greyStock) {
      return res.status(404).json({ message: 'Grey stock entry not found' });
    }

    // Respond with the grey stock data
    res.status(200).json({
      message: 'Grey stock entry fetched successfully',
      data: greyStock,
    });
  } catch (error) {
    console.error('Error fetching grey stock entry by challan:', error);
    res.status(500).json({
      message: 'Server error while fetching grey stock entry',
      error: error.message,
    });
  }
};


exports.ModifyGreyPurchase = async (req, res) => {
  try {
    const { id } = req.params; // Purchase ID from URL
    const updatedData = req.body; // Updated data from the request body

    console.log("Data to be modified:", updatedData); // Log the incoming data for verification

    // Fetch the existing GreyPurchase record
    const greyPurchase = await GreyPurchase.findById(id);
    if (!greyPurchase) {
      return res.status(404).json({ message: 'Grey purchase not found' });
    }

    // Determine if quality, total roll, date of purchase, or bill number has changed
    const isQualityChanged = updatedData.grey_purchase_quality && updatedData.grey_purchase_quality !== greyPurchase.grey_purchase_quality;
    const isTotalRollChanged = updatedData.grey_total_roll && updatedData.grey_total_roll !== greyPurchase.grey_total_roll;
    const isDateOfPurchaseChanged = updatedData.grey_date_of_purchase && updatedData.grey_date_of_purchase !== greyPurchase.grey_date_of_purchase;
    const isBillNoChanged = updatedData.grey_bill_no && updatedData.grey_bill_no !== greyPurchase.grey_bill_no;

    console.log("isQualityChanged:", isQualityChanged);
    console.log("isTotalRollChanged:", isTotalRollChanged);
    console.log("isDateOfPurchaseChanged:", isDateOfPurchaseChanged);
    console.log("isBillNoChanged:", isBillNoChanged);

    // Update the GreyPurchase record with new data
    Object.assign(greyPurchase, updatedData);
    await greyPurchase.save();

    // If any of the fields have changed (quality, total roll, date of purchase, bill no), update the corresponding GreyStock
    if (isQualityChanged || isTotalRollChanged || isDateOfPurchaseChanged || isBillNoChanged) {
      const greyStock = await GreyStock.findOne({ grey_purchase_challan: greyPurchase.grey_challan_no });

      if (greyStock) {
        // Prepare update fields for GreyStock
        const greyStockUpdateFields = {};

        if (isQualityChanged) {
          greyStockUpdateFields.grey_purchase_quality = updatedData.grey_purchase_quality;
        }
        if (isTotalRollChanged) {
          greyStockUpdateFields.grey_purchase_total_roll = updatedData.grey_total_roll;
        }
        if (isDateOfPurchaseChanged) {
          greyStockUpdateFields.grey_purchase_date = updatedData.grey_date_of_purchase;
        }
        if (isBillNoChanged) {
          greyStockUpdateFields.grey_purchase_billno = updatedData.grey_bill_no;
        }

        console.log("Fields to update in GreyStock:", greyStockUpdateFields); // Debugging output

        // Apply updates to GreyStock
        Object.assign(greyStock, greyStockUpdateFields);
        await greyStock.save();
      } else {
        // Handle case if there's no GreyStock record linked with the challan number
        return res.status(404).json({ message: 'Grey stock record not found for this challan number' });
      }
    }

    return res.status(200).json({ message: 'Grey purchase and stock updated successfully' });

  } catch (error) {
    console.error('Error modifying grey purchase:', error);
    return res.status(500).json({ message: 'An error occurred while modifying the grey purchase' });
  }
};
