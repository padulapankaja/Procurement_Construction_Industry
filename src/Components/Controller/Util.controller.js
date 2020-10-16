import React, { Component } from 'react';
export const gettotal = (items = []) => {
        return items.reduce( (acc,current) => {
          if(current.item && current.item.price && current.quantity){
              return acc + (current.item.price * current.quantity)
          }else{
            return acc
          }
        },0)
      }

export const render_state = (status) => {
        switch(parseInt(status.state)){
            case 0 : return  <span className="mr-1 small rounded bg-danger px-2 text-white ">{status.comment}</span>
            case 1 : return  <span className="mr-1 small rounded bg-info px-2 text-white ">{status.comment}</span>
            case 2 : return  <span className="mr-1 small rounded state2 px-2 text-white">{status.comment}</span> 
            case 3 : return  <span className="mr-1 small rounded state3 px-2 text-white">{status.comment}</span> 
            case 4 : return  <span className="mr-1 small rounded state4 px-2 text-white">{status.comment}</span>
            case 5 : return  <span className="mr-1 small rounded bg-success px-2 text-white">{status.comment}</span>
          }
    }

export const current_state = (status) => {
        switch(parseInt(status)){
            case 0 : return 'Rejected' 
            case 1 : return 'Order Placed' 
            case 2 : return  'Accountant Approved'
            case 3 : return  'Management Approved'
            case 4 : return  'Supplier Approved'
            case 5 : return  'Delivered'
          }
    }

export const state_color = (status) => {
        switch(parseInt(status)){
            case 0 : return "xx00"  
            case 1 : return "xx01" 
            case 2 : return "xx02"  
            case 3 : return "xx03"  
            case 4 : return "xx04"  
            case 5 : return "xx05"  
          }
    }