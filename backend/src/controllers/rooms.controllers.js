import { db } from "../libs/db.js";
import { updateProblem } from "./problem.controllers.js";

const createRoom = async (req, res) => {
  try {
    const userId = req.user.id;

    const { problemId } = req.body;

    if (!problemId) {
      return res.status(400).json({
        status: false,
        message: "Please enter Problem Id too create a Room!",
      });
    }

    const roomCode = Math.random().toFixed(4).slice(2);

    const room = await db.room.create({
      data: {
        roomCode,
        problemId,
        createdBy: userId,
        participants: {
          create: [{ userId }],
        },
      },
    });

    return res.status(201).json({
      success: true,
      message: "Room created successfully!",
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      error: error.message,
    });
  }
};

const joinRoom = async (req, res) => {
  try {
    const userId = req.user.id;

    const { roomCode } = req.body;

    if (!roomCode) {
      return res.status(400).json({
        success: false,
        message: "No Room Id provided!",
      });
    }

    const room = await db.room.findUnique({
        where: {
            roomCode
        },
        include: {
            participants: true
        }
    })

    if(!room) {
      return res.status(400).json({
        success: false,
        message: "No Room found!",
      });
    }

    // await db.roomParticipant.upsert({
    //     where: {
    //         roomId_userId: {
    //             roomId: room.id,
    //             userId
    //         },
    //         create: {
    //             roomId: room.id,
    //             userId
    //         },
    //         update: {}
    //     }
    // })

    return res.status(200).json({
        success: true,
        message: "Room Joined!",
        room
    })

  } catch (error) {
    return res.status(404).json({
      success: false,
      error: error.message,
    });
  }
};

export { createRoom, joinRoom };
