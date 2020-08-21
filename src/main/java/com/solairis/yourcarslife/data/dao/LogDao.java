/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.solairis.yourcarslife.data.dao;

import com.solairis.yourcarslife.data.exception.LogDaoException;
import com.solairis.yourcarslife.data.domain.Log;
import com.solairis.yourcarslife.data.input.LogInputData;
import java.util.List;

/**
 *
 * @author josh
 */
public interface LogDao {

	public Log getLog(long logId) throws LogDaoException;

	public List<? extends Log> getLogs(LogInputData inputData) throws LogDaoException;

	public void save(Log vehicleLog) throws LogDaoException;

	public int getLogCount(LogInputData inputData) throws LogDaoException;

}
